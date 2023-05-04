import { useEffect, useRef } from "react";
import { WidgetInstance } from 'friendly-challenge';

const FriendlyCaptcha = ({setVerified}) => {
  const container = useRef();
  const widget = useRef();

  const doneCallback = (solution) => {
    console.log('Captcha was solved. The form can be submitted.');
    console.log(solution);
    setVerified(true)
  }

  const errorCallback = (err) => {
    console.log('There was an error when trying to solve the Captcha.');
    console.log(err);
  }

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, { 
        startMode: "auto",
        doneCallback: doneCallback,
        errorCallback: errorCallback 
      });
    }
console.log(widget)
    return () => {
      if (widget.current != undefined) widget.current.reset();
    }
  }, [container]);

  return (
    <div className="captcha">
        <div ref={container} className="frc-captcha" data-sitekey="FCMGBEQECC3HU8S3" />
    </div>
  );
}

export default FriendlyCaptcha;