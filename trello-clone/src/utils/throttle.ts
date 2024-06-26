export interface ThrottleOptions {
    delay: number;
    leading?: boolean;
    trailing?: boolean;
  }
  
  export const isThrottleOptions = (arg: ThrottleOptions | number): arg is ThrottleOptions => {
    return (arg as ThrottleOptions).delay !== undefined;
  };
  

export function throttle(options: ThrottleOptions | number, callback: any) {
    let delay: number;
    const leading = (options as ThrottleOptions).leading || false;
    const trailing = (options as ThrottleOptions).trailing || false;
  
    let timeoutID: NodeJS.Timeout | undefined;
    let cancelled: boolean;
    let lastExec = leading ? 0 : Date.now();
  
    if (isThrottleOptions(options)) {
      delay = options.delay;
    } else {
      delay = options;
    }
  
    const clearExistingTimeout = () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = undefined;
      }
    };
  
    const cancel = () => {
      clearExistingTimeout();
      cancelled = true;
    };
  
    const trailingExec = (exec: () => void) => {
      if (trailing) {
        clearExistingTimeout();
        if (!timeoutID) {
          timeoutID = setTimeout(exec, delay);
        }
      }
    };
  
    function wrapper(this: () => void, ...args: any) {
      if (cancelled) {
        return;
      }
  
      const self = this;
  
      const exec = () => {
        lastExec = Date.now();
        callback.apply(self, args);
      };
  
      trailingExec(exec);
  
      const runTime = Date.now() - lastExec;
      if (runTime > delay) {
        exec();
      }
    }
  
    wrapper.cancel = cancel;
    return wrapper;
  }