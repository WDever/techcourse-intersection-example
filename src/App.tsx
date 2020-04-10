import React, {
  useRef,
  useState,
  useEffect,
  RefObject,
  ReactElement,
} from "react";
import "./App.css";
import { useIntersection } from "./hooks";

function App() {
  const [list, setList] = useState<ReactElement[]>([
    <div className="box first">{0}</div>,
  ]);

  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const addList = (): void => {
    setTimeout(() => {
      setList(list.concat(<div className="box">{list.length}</div>));
    }, 2000);
  };

  useEffect(() => {
    if (!(intersection && intersection.isIntersecting)) {
      return;
    }
    addList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return (
    <div className="App">
      <div className="list">
        {list}
        <div className="loader" ref={ref}>
          {intersection?.isIntersecting ? "로딩중" : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
