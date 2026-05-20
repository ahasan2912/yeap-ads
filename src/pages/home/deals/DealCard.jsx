import { MapPin, Store, Tag } from "lucide-react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import { getDealPricing } from "../../../utils/dealPricing";

const DealCard = ({ deal, compact = false, imageSize = "normal" }) => {
    const {
        _id, title, reguler_price, discount, distance, promotedUntil, shop
    } = deal || {};
    const image = deal?.images?.[0];
    const { regularPrice: price, finalPrice, discount: dealDiscount, hasDiscount } = getDealPricing(reguler_price, discount);
    const dealDistance = Number(distance) || 0;
    const distanceMiles = dealDistance / 1609.344;

    if (compact) {
        const imageHeight = imageSize === "tall" ? "h-56 min-[501px]:h-44" : "h-36 min-[501px]:h-44";

        return (
            <Link to={`/deal-details/${_id}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--primary-color)_14%,white)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--primary-color)_32%,white)] hover:shadow-md">
                <div className={`relative w-full ${imageHeight}`}>
                    <img
                        src={image || "/no-image.png"}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
                    {hasDiscount && (
                        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-[11px] font-bold text-white shadow-sm">
                            <Tag size={12} aria-hidden="true" />
                            {dealDiscount}% off
                        </div>
                    )}
                    <div className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-0.5 rounded-full bg-white/95 px-3 py-1 text-[13px] font-bold text-primary shadow-sm ring-1 ring-white/70">
                        <MapPin size={14} className="shrink-0" aria-hidden="true" />
                        <span className="truncate mt-0.5">{distanceMiles.toFixed(2)} miles away</span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2.5">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#262626] sm:text-base">
                        {title}
                    </h3>

                    <div className="mt-2 flex min-w-0 items-center gap-1 text-xs text-[#A3A3A3] sm:text-sm">
                        <Store size={14} className="shrink-0 text-[#A3A3A3]" aria-hidden="true" />
                        <span className="min-w-0 truncate">{shop?.business_name}</span>
                    </div>

                    <div className="mt-2 flex min-w-0 flex-wrap items-start justify-between gap-2">
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5">
                            <span className="text-lg font-bold text-[#262626] sm:text-xl">
                                ${finalPrice.toFixed(0)}
                            </span>

                            {hasDiscount && (
                                <span className="text-xs font-medium text-[#A3A3A3] line-through sm:text-sm">
                                    ${price.toFixed(0)}
                                </span>
                            )}
                        </div>
                        <Countdown countdown={promotedUntil} compact />
                    </div>

                    <span className="mt-auto block w-full rounded-full bg-primary py-2 text-center text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(76,175,80,0.9)] transition-colors hover:bg-secondary">
                        Redeem Now
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <Link to={`/deal-details/${_id}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--primary-color)_14%,white)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--primary-color)_32%,white)] hover:shadow-lg">
            <div className="relative h-48 w-full">
                <img
                    src={image || "/no-image.png"}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                {hasDiscount && (
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                        <Tag size={13} aria-hidden="true" />
                        {dealDiscount}% off
                    </div>
                )}
                <div className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-0.5 rounded-full bg-white/95 px-3 py-1 text-[13px] font-bold text-primary shadow-sm ring-1 ring-white/70">
                    <MapPin size={14} className="shrink-0" aria-hidden="true" />
                    <span className="truncate mt-0.5">{distanceMiles.toFixed(2)} miles away</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {title}
                </h3>

                <div className="mt-2 flex min-w-0 items-center gap-1.5 text-sm font-medium text-[#737373]">
                    <Store size={17} className="shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 truncate">{shop?.business_name}</span>
                </div>

                <div className="mt-4 flex min-w-0 flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5">
                        <span className="text-2xl font-bold leading-none text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        {hasDiscount && (
                            <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                ${price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <Countdown countdown={promotedUntil} />
                </div>

                <span className="mt-auto block w-full rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(76,175,80,0.9)] transition-colors hover:bg-secondary">
                    Redeem Now
                </span>
            </div>
        </Link>
    );
};

export default DealCard;
