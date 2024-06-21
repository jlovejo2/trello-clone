import { useState, useEffect } from "react";
import { AppState } from "./state/appStateReducer";
import { load } from "./api";

type InjectedProps = {
    initialState: AppState
}

// helper type that takes essentially removes the InjectedProps type from the generic TBaseProps 
// which essentially represents the original props of wrapped component
type PropsWithoutInject<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

// the complex typing done here with withInitialState Props is essentially allowing us to tell Typescript that component accepts InjectedProps
// without the intersection type it would likely not let us pass the props of InjectedPRops to component 
export function withInitialState<TProps>(WrappedContent: React.ComponentType<PropsWithoutInject<TProps> & InjectedProps>) {
    return (props: PropsWithoutInject<TProps>) => {
        const [ initialState, setInitialState ] = useState<AppState>({lists: [], draggedItem: null});
        const [isLoading, setIsLoading ] = useState(true);
        const [error, setError] = useState<Error | undefined>()
        
        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load();
                    setInitialState(data);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err)
                    }
                }

                setIsLoading(false)
            }
            fetchInitialState()
        }, [])

        if (isLoading ) {
            return <div>Loading....</div>
        }

        if (error) {
            return <div>{error.message}</div>
        }

        return <WrappedContent {...props} initialState={initialState} />
    }
}