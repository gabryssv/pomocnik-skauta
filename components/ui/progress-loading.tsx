import React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    size?: "sm" | "md" | "lg"
    color?: "default" | "success" | "warning" | "danger"
    showValueLabel?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value = 0, size = "md", color = "default", showValueLabel = false, ...props }, ref) => {
        const sizeClasses = {
            sm: "h-2",
            md: "h-3",
            lg: "h-4"
        }

        const colorClasses = {
            default: "bg-blue-500",
            success: "bg-green-500",
            warning: "bg-yellow-500",
            danger: "bg-red-500"
        }

        return (
            <div className="w-full space-y-2" ref={ref} {...props}>
                {showValueLabel && (
                    <div className="flex justify-between text-sm text-neutral-400">
                        <span>Ładowanie...</span>
                        <span>{Math.round(Math.min(100, value))}%</span>
                    </div>
                )}
                <div className={cn("w-full bg-neutral-800 rounded-full overflow-hidden", sizeClasses[size], className)}>
                    <div
                        className={cn("h-full transition-all duration-300 ease-out rounded-full", colorClasses[color])}
                        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                    />
                </div>
            </div>
        )
    }
)

Progress.displayName = "Progress"

export { Progress }