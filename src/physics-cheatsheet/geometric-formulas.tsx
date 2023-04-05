import React from "react";
import Latex from "react-latex";
import { NavLink, Outlet } from "react-router-dom";
import "./geometric-formulas.scss";

export function GeometricFormulas() {
    return (
        <div className="geometric-formulas">
            <nav>
                <NavLink to="2d" className={({ isActive }) => isActive ? 'active' : ''}>
                    2D
                </NavLink>
                <NavLink to="3d" className={({ isActive }) => isActive ? 'active' : ''}>
                    3D
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}

type FormulaProps = {
    name: string,
    perimeterFormula?: string,
    surfaceFormula?: string,
    volumeFormula?: string,
    Icon: (hlP: boolean, hlS: boolean, hlV: boolean) => React.ReactNode
}
function Formula({ name, perimeterFormula, surfaceFormula, volumeFormula, Icon }: FormulaProps) {
    const [overPerimeter, setOverPerimeter] = React.useState(false);
    const [overSurface, setOverSurface] = React.useState(false);
    const [overVolume, setOverVolume] = React.useState(false);

    return (
        <section>
            {Icon(overPerimeter, overSurface, overVolume)}
            <div className="info">
                <h3>{name}</h3>
                {perimeterFormula && (
                    <div
                        className="perimeter"
                        onMouseEnter={() => setOverPerimeter(true)}
                        onMouseLeave={() => setOverPerimeter(false)}
                    >
                        <Latex>{'$$ P = ' + perimeterFormula + '$$'}</Latex>
                    </div>
                )}
                {surfaceFormula && (
                    <div
                        className="surface"
                        onMouseEnter={() => setOverSurface(true)}
                        onMouseLeave={() => setOverSurface(false)}
                    >
                        <Latex>{'$$ S = ' + surfaceFormula + '$$'}</Latex>
                    </div>
                )}
                {volumeFormula && (
                    <div
                        className="volume"
                        onMouseEnter={() => setOverVolume(true)}
                        onMouseLeave={() => setOverVolume(false)}
                    >
                        <Latex>{'$$ V = ' + volumeFormula + '$$'}</Latex>
                    </div>
                )}
            </div>
        </section>
    )
}

export function GeometricFormulas2D() {
    return (
        <div className="list">
            <Formula
                name="Square"
                perimeterFormula="4a"
                surfaceFormula="a^2"
                Icon={(hlP, hlS) => (
                    <svg height={100} width={100}>
                        <rect x={10} y={10} height={80} width={80} className={`stroke ${hlP?'hl-stroke':''} ${hlS?'hl-fill':''}`} />
                        <text x={50} y={85} className="bottom">a</text>
                    </svg>
                )}
            />
            <Formula
                name="Rectangle"
                perimeterFormula="2a + 2b"
                surfaceFormula="ab"
                Icon={(hlP, hlS) => (
                    <svg height={100} width={100}>
                        <rect x={10} y={20} height={60} width={80} className={`stroke ${hlP?'hl-stroke':''} ${hlS?'hl-fill':''}`} />
                        <text x={50} y={75} className="bottom">a</text>
                        <text x={85} y={50} className="right">b</text>
                    </svg>
                )}
            />
            <Formula
                name="Circle"
                perimeterFormula="2\pi r"
                surfaceFormula="\pi r^2"
                Icon={(hlP, hlS) => (
                    <svg height={100} width={100}>
                        <circle cx={50} cy={50} r={40} className={`stroke ${hlP?'hl-stroke':''} ${hlS?'hl-fill':''}`} />
                        <circle cx={50} cy={50} r={3} className="fill" />
                        <line x1={50} y1={50} x2={90} y2={50} className="stroke"></line>
                        <text x={70} y={50} className="bottom">r</text>
                    </svg>
                )}
            />
            <Formula
                name="Equilateral Triangle"
                perimeterFormula="3a"
                surfaceFormula="\frac{\sqrt{3}}{4}a^2"
                Icon={(hlP, hlS) => (
                    <svg height={100} width={100}>
                        <polygon points="50,15 10,85 90,85" className={`stroke ${hlP?'hl-stroke':''} ${hlS?'hl-fill':''}`} />
                        <text x={50} y={80} className="bottom">a</text>
                    </svg>
                )}
            />
            <Formula
                name="Isosceles Triangle"
                perimeterFormula="2a + b"
                surfaceFormula="\frac{bh}{2}"
                Icon={(hlP, hlS) => (
                    <svg height={100} width={100}>
                        <polygon points="50,15 20,85 80,85" className={`stroke ${hlP?'hl-stroke':''} ${hlS?'hl-fill':''}`} />
                        <line x1={50} y1={15} x2={50} y2={85} className="stroke-light" />
                        <text x={50} y={88} className="top">a</text>
                        <text x={80} y={50} className="right">b</text>
                        <text x={20} y={50} className="left">b</text>
                        <text x={50} y={60} className="bottom">h<sub>b</sub></text>
                    </svg>
                )}
            />
        </div>
    )
}

export function GeometricFormulas3D() {
    return (
        <div className="list">
            {/* <Formula
                name="Cube"
                perimeterFormula="12a"
                surfaceFormula="6a^2"
                volumeFormula="a^3"
                Icon={(hlP, hlS) => (
                    <svg height={100} width={100}>
                        <rect x={10} y={10} height={80} width={80} className={`stroke ${hlP?'hl-stroke':''} ${hlS?'hl-fill':''}`} />
                        <text x={50} y={85} className="bottom">a</text>
                    </svg>
                )}
            /> */}
            Sorry, nothing here right now. Come back later.
        </div>
    )
}