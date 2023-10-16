import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps extends React.PropsWithChildren {
  selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    setElement(document.querySelector(selector));
  }, [selector]);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
