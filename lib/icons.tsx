import { Hammer, Radio, Compass, Theater, ChefHat, Heart } from "lucide-react"
import { LatinCross } from "@/components/icons/latin-cross"
import type { ComponentType } from "react"

export type IconComponent = ComponentType<{ className?: string }>

const map: Record<string, IconComponent> = {
    hammer: Hammer,
    radio: Radio,
    compass: Compass,
    theater: Theater,
    "chef-hat": ChefHat,
    heart: Heart,
    "latin-cross": LatinCross,
}

export function getIconComponent(name?: string): IconComponent {
    if (!name) return Hammer
    const key = name.toLowerCase()
    return map[key] ?? Hammer
}