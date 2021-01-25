import React, { Component } from 'react';
import { ConfigContext } from "./../../Config"

type LoadingSvgProps = {}
type LoadingSvgState = {}

const svgParts = [
    { transform: "rotate(0 50 50)", begin: "-0.9090909090909091s" },
    { transform: "rotate(32.72727272727273 50 50)", begin: "-0.8181818181818182s" },
    { transform: "rotate(65.45454545454545 50 50)", begin: "-0.7272727272727273s" },
    { transform: "rotate(98.18181818181819 50 50)", begin: "-0.6363636363636364s" },
    { transform: "rotate(130.9090909090909 50 50)", begin: "-0.5454545454545454s" },
    { transform: "rotate(163.63636363636363 50 50)", begin: "-0.45454545454545453s" },
    { transform: "rotate(196.36363636363637 50 50)", begin: "-0.36363636363636365s" },
    { transform: "rotate(229.0909090909091 50 50)", begin: "-0.2727272727272727s" },
    { transform: "rotate(261.8181818181818 50 50)", begin: "-0.18181818181818182s" },
    { transform: "rotate(294.54545454545456 50 50)", begin: "-0.09090909090909091s" },
    { transform: "rotate(327.27272727272725 50 50)", begin: "0s" }
]

export default class LoadingSvg extends Component<LoadingSvgProps, LoadingSvgState> {
    static contextType = ConfigContext
    constructor(props: LoadingSvgProps) {
        super(props)
        this.state = {
            ...props,
        }
    }
    render() {
        let { getTheme } = this.context
        return (
            <svg className="loading-svg" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                {svgParts.map(part =>
                    <g key={part.begin} transform={part.transform}>
                        <rect x="47.5" y="24" rx="1.08" ry="1.08" width="5" height="12" fill={getTheme().global.mainColor}>
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin={part.begin} />
                        </rect>
                    </g>
                )}
            </svg>
        );
    }
}