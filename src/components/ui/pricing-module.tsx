"use client";

import * as React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlanFeature {
    label: string;
    included: boolean;
}

export interface PricingPlan {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    priceMonthly: number;
    priceYearly: number;
    users: string;
    features: PlanFeature[];
    recommended?: boolean;
}

export interface PricingModuleProps {
    title?: string;
    subtitle?: string;
    annualBillingLabel?: string;
    buttonLabel?: string;
    plans: PricingPlan[];
    defaultAnnual?: boolean;
    className?: string;
}

export function PricingModule({
    title = "Pricing Plans",
    subtitle = "Choose a plan that fits your needs.",
    annualBillingLabel = "Annual billing",
    buttonLabel = "Get started",
    plans,
    defaultAnnual = false,
    className,
}: PricingModuleProps) {
    // Annual billing disabled
    const isAnnual = false;

    return (
        <section
            className={cn(
                "w-full bg-ai-black text-foreground py-20 px-4 md:px-8",
                className
            )}
        >
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-tight mb-2 text-white">{title}</h2>
                <p className="text-muted-foreground mb-12 text-zinc-400">{subtitle}</p>


                {/* Pricing Cards */}
                <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pt-6 pb-8 md:pb-0 -mx-4 px-4 md:mx-auto md:px-0">
                    {plans.map((plan) => (
                        <div key={plan.id} className="min-w-[80vw] md:min-w-0 snap-center h-full">
                            <Card
                                key={plan.id}
                                className={cn(
                                    "relative border border-white/10 rounded-3xl transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-ai-blue/30 bg-ai-card text-left flex flex-col h-full",
                                    plan.recommended && "border-ai-blue ring-1 ring-ai-blue/30 scale-[1.03] z-10"
                                )}
                            >
                                {plan.recommended && (
                                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-ai-blue text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-lg z-20">
                                        Recommended
                                    </div>
                                )}

                                <CardHeader className="text-center pt-5 md:pt-8 pb-0 px-4">
                                    <div className="flex justify-center mb-2 text-ai-blue transform scale-75 md:scale-100 origin-bottom">{plan.icon}</div>
                                    <CardTitle className="text-white text-lg md:text-2xl leading-none md:leading-tight">{plan.name}</CardTitle>
                                    <CardDescription className="text-zinc-500 text-[10px] md:text-sm mt-1 line-clamp-2 md:line-clamp-none">{plan.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="text-center flex-1 flex flex-col px-4 pb-5 md:pb-8">
                                    <div className="text-2xl md:text-4xl font-bold mb-0 transition-all duration-300 text-white mt-2 md:mt-4">
                                        ₹{(isAnnual ? plan.priceYearly : plan.priceMonthly).toLocaleString('en-IN')}
                                    </div>
                                    <p className="text-[10px] md:text-sm text-zinc-500 mb-3 md:mb-6">
                                        Starting From
                                    </p>

                                    <Link href="#contact" className="w-full">
                                        <Button
                                            variant={plan.recommended ? "default" : "outline"}
                                            className={cn(
                                                "w-full mb-3 md:mb-6 py-4 md:py-6 rounded-2xl font-bold tracking-wide transition-all text-xs md:text-base",
                                                plan.recommended
                                                    ? "bg-ai-blue hover:bg-ai-blue-dim text-white border-none shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                                                    : "bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                                            )}
                                        >
                                            {buttonLabel}
                                        </Button>
                                    </Link>

                                    <div className="text-left mt-auto bg-white/5 rounded-xl p-2.5 md:p-4">
                                        <h4 className="font-mono text-[8px] md:text-xs uppercase tracking-widest text-zinc-400 mb-1.5 md:mb-3 opacity-70">Highlights</h4>
                                        <ul className="space-y-1 md:space-y-2">
                                            {plan.features.slice(0, 5).map((f, i) => (
                                                <li key={i} className="flex items-center gap-1.5 md:gap-3">
                                                    {f.included ? (
                                                        <Check className="w-2.5 h-2.5 md:w-4 md:h-4 text-ai-blue shrink-0" />
                                                    ) : (
                                                        <X className="w-2.5 h-2.5 md:w-4 md:h-4 text-zinc-600 shrink-0" />
                                                    )}
                                                    <span
                                                        className={cn(
                                                            "text-[9px] md:text-sm leading-tight font-medium tracking-tight",
                                                            f.included ? "text-zinc-300" : "text-zinc-600 line-through"
                                                        )}
                                                    >
                                                        {f.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
