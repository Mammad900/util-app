import { Link, Navigate, Outlet, Route } from "react-router-dom"
import "./physics-cheatsheet.scss"
import { GeometricFormulas, GeometricFormulas2D, GeometricFormulas3D } from "./geometric-formulas"

export function PhysicsCheatSheetIcon() {
    return (
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
            <text x="50%" y="50%" style={{ fontSize: 56, fill: 'currentcolor', textAnchor: 'middle', dominantBaseline: 'central' }}>mc²</text>
        </svg>
    )
}

export function PhysicsCheatSheetRoutes() {
    return (
        <>
            <Route index element={<Index />} />
            <Route path="geometric-formulas" element={<GeometricFormulas />}>
                <Route index element={<Navigate to="2d" replace />} />
                <Route path="2d" element={<GeometricFormulas2D />} />
                <Route path="3d" element={<GeometricFormulas3D />} />
            </Route>
        </>
    )
}

export default function PhysicsCheatSheet() {
    return (
        <main id="physics-cheat-sheet">
            <Outlet />
        </main>
    )
}

function Index() {
    return (
        <div className="index">
            <Link to="geometric-formulas">Geometric Formulas</Link>
        </div>
    )
}
