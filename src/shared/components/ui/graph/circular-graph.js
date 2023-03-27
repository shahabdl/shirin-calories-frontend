import { useEffect, useRef, useState } from "react";
import SvgIcon from "../icons";

const CircularGraph = (props) => {
    const [itemsData, setItemsData] = useState([]);
    const [midValPosition, setMidValPosition] = useState({});
    const ref = useRef();

    const graphLineMouseOverHandler = (e) => {
        let itemId = e.getAttribute("data-legend-id");
        if (itemId) {
            let item = document.getElementById(itemId);
            let middleLegend = document.getElementById("graph-mid-value-" + props.middleValue.legend + "-" + props.id);
            let itemIndex = e.getAttribute('data-index');
            middleLegend.classList.add('opacity-0');
            item.classList.remove('opacity-0')
            e.style.strokeWidth = props.data[itemIndex].hoverStrokeWidth + "px";
        }
    }
    const graphLineMouseLeaveHandler = (e) => {
        let itemId = e.getAttribute("data-legend-id");
        if (itemId) {
            let item = document.getElementById(itemId);
            let middleLegend = document.getElementById("graph-mid-value-" + props.middleValue.legend + "-" + props.id);
            let itemIndex = e.getAttribute('data-index');

            middleLegend.classList.remove('opacity-0');
            item.classList.add('opacity-0')

            e.style.strokeWidth = props.data[itemIndex].strokeWidth + "px";
        }
    }
    useEffect(() => {

        let total = 0;
        for (let item in props.data) {
            total += props.data[item].value;
        }
        let tempData = []
        let percentage = 0;
        for (let item in props.data) {
            percentage += props.data[item].value / total;
            tempData.push({ totalPercent: percentage, percent: props.data[item].value / total });
        }

        let graphRadius, graphWidth;
        graphWidth = ref.current.offsetWidth - props.options.padding * 2;
        graphRadius = graphWidth / 2;

        let sinVal, cosVal;
        let startPoint = { x: 0, y: 0 };
        let endPoint = { x: 0, y: 0 }
        for (let index in tempData) {
            if (index == 0) {
                startPoint.x = graphRadius + props.options.padding;
                startPoint.y = props.options.padding;
            } else if (index > 0) {
                startPoint.x = endPoint.x;
                startPoint.y = endPoint.y;
            }
            sinVal = Math.sin(tempData[index].totalPercent * Math.PI * 2);
            cosVal = (1 - Math.cos(tempData[index].totalPercent * Math.PI * 2));
            endPoint.x = sinVal * graphRadius + graphWidth / 2 + props.options.padding;
            endPoint.y = cosVal * graphRadius + props.options.padding;

            tempData[index].endPoint = { ...endPoint };
            let newArcString =
                `M ${startPoint.x} ${startPoint.y}
                    A ${graphRadius} ${graphRadius} 0 ${tempData[index].percent > 0.5 ? 1 : 0} 1 ${endPoint.x} ${endPoint.y}`;
            tempData[index].stringPath = newArcString;
            setMidValPosition({ top: props.options.padding + graphRadius });
        }
        setItemsData(tempData);
    }, [props])

    return (
        <div className="w-full relative grid grid-cols-5 h-min gap-2">
            {props.options.showMiddleValue ?
                <>
                    <div
                        id={"graph-mid-value-" + props.middleValue.legend + "-" + props.id}
                        style={{ top: isNaN(midValPosition.top) ? 200 : midValPosition.top, left: isNaN(midValPosition.top) ? 200 : midValPosition.top, width: (isNaN(midValPosition.top) ? 200 : midValPosition.top - props.options.padding) * 2 - 30 }}
                        className={'absolute -translate-x-1/2 -translate-y-1/2 transition-opacity opacity-100 flex gap-3 items-center justify-center '}>
                        <div className="h-min">
                            {props.middleValue.legend}
                        </div>
                        <div className="h-min">
                            {isNaN(props.middleValue.value)?"-":props.middleValue.value}
                        </div>
                    </div>
                    {itemsData.map((item, index) => {
                        return (
                            <div
                                key={index + "-" + props.data[index].name + "-legend-" + props.id}
                                id={index + "-" + props.data[index].name + "-legend-" + props.id}
                                style={{ top: isNaN(midValPosition.top) ? 200 : midValPosition.top, left: isNaN(midValPosition.top) ? 200 : midValPosition.top, width: ((isNaN(midValPosition.top) ? 200 : midValPosition.top) - props.options.padding) * 2 - 30 }}
                                className={"flex absolute -translate-x-1/2 -translate-y-1/2 gap-3 transition-opacity items-center justify-center opacity-0"}>
                                {props.options.showCenterIcons ?
                                    <div
                                        style={{ backgroundColor: props.data[index].color }}
                                        className="p-1 rounded-md">
                                        <SvgIcon
                                            className="fill-[white]"
                                            icon={props.data[index].icon} width="25" height="25" />
                                    </div>
                                    : ""}
                                <div className="h-min">{props.data[index].name}</div>
                                <div className="h-min">{props.data[index].value}</div>

                            </div>
                        )
                    })}

                </>
                : ""}

            <div ref={ref} className={props.options.showLegend ? 'col-span-3' : 'col-span-5'} style={{ height: isNaN(midValPosition.top) ? 200 : midValPosition.top * 2 }}>
                <svg width="100%" height="100%" >
                    {itemsData.map((item, index) => {
                        return (
                            <path
                                data-index={index}
                                onMouseOver={(e) => {
                                    graphLineMouseOverHandler(e.currentTarget);
                                }}
                                onMouseLeave={(e) => {
                                    graphLineMouseLeaveHandler(e.currentTarget);
                                }}
                                key={index}
                                data-legend-id={index + "-" + props.data[index].name + "-legend-" + props.id}
                                d={item.stringPath}
                                fill="transparent"
                                strokeWidth={props.data[index].strokeWidth}
                                stroke={props.data[index].color}
                                data-stroke="20"
                                className={`graph-line transition-[stroke-width]`} />
                        )
                    })}
                </svg>
            </div>
            {props.options.showLegend ?
                <div className="flex gap-3 flex-col justify-center col-span-2">
                    {itemsData.map((item, index) => {
                        return (
                            <div
                                className="flex gap-2"
                                key={index + "-legend-icon-" + props.id}
                                onMouseEnter={(e) => {
                                    graphLineMouseOverHandler(e.currentTarget);
                                }}
                                onMouseLeave={(e) => {
                                    graphLineMouseLeaveHandler(e.currentTarget);
                                }}
                                data-legend-id={index + "-" + props.data[index].name + "-legend-" + props.id}
                                data-index={index}
                            >
                                <div className="rounded p-1" style={{ backgroundColor: props.data[index].color }}>
                                    <SvgIcon icon={props.data[index].icon} width={props.options.iconSize} height={props.options.iconSize} className="fill-[white]" />
                                </div>
                                <div className="font-light">{props.data[index].name}</div>
                            </div>
                        )
                    })}
                </div>
                :
                ""
            }
        </div>
    );
}

export default CircularGraph;