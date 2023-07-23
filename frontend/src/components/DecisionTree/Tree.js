import { useState } from "react";
import SplitButton from "./SplitButton";

export default function Tree({ bestTree }) {

    var condition = !(bestTree === null);

    const keyList = condition ? Object.keys(bestTree.child) : [];

    const boolValues = new Array(keyList.length).fill(false);
    const [render, setRender] = useState(boolValues);

    const renderSubtree = (i) => () => {
        setRender([
            ...render.slice(0, i),
            !render[i],
            ...render.slice(i + 1)
        ]);
    }


    if (!condition) {
        return <></>
    }

    return (
        <div style={{ paddingLeft: "100px" }}>
            <br />
            <>{bestTree.w.length} words,
                {/* best word: {bestTree.v}, */}
                {keyList.length} colourings, {bestTree.tries} tries total</>
            <div style={{ height: "10px" }}></div>
            {keyList.map(
                (x, i) => {
                    return (
                        <div key={i}>
                            <SplitButton changeStatus={renderSubtree} index={i} int={x} len={bestTree.v.length} word={bestTree.v} />
                            {render[i] && <Tree bestTree={bestTree.child[x]} />}
                            <br />
                        </div >
                    )
                }
            )}
        </div>
    )
}
