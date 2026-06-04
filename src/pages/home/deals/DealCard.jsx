import { MapPin, Store, Tag } from "lucide-react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import { getDealPricing } from "../../../utils/dealPricing";

const DealCard = ({ deal }) => {
    const {
        _id, title, reguler_price, discount, distance, promotedUntil, shop
    } = deal || {};
    const image = deal?.images?.[0];
    const { regularPrice: price, finalPrice, discount: dealDiscount, hasDiscount } = getDealPricing(reguler_price, discount);
    const dealDistance = Number(distance) || 0;
    const distanceMiles = dealDistance / 1609.344;

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
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {title}
                </h3>

                <div className="mt-2 flex min-w-0 items-center gap-1.5 text-sm font-medium text-[#737373]">
                    <Store size={17} className="shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 truncate">{shop?.business_name}</span>
                </div>

                <div className="mt-4 flex min-w-0 flex-col items-start justify-between gap-3">
                    <div className="flex min-w-0  items-baseline gap-x-1 gap-y-0.5">
                        <span className="text-xl sm:text-2xl font-bold leading-none text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        {hasDiscount && (
                            <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                ${price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="inline-flex max-w-[calc(100%-1.5rem)] items-center gap-0.5 text-[13px] font-bold text-primary ">
                        <MapPin size={14} className="shrink-0" aria-hidden="true" />
                        <span className="truncate mt-0.5">{distanceMiles.toFixed(2)} miles away</span>
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
