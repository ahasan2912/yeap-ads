import { MapPin, Store } from "lucide-react";
import { Link } from "react-router-dom";
import Countdown from "../../home/deals/Countdown";
import { getDealPricing } from "../../../utils/dealPricing";

const DealCard = ({ deal }) => {
    const { _id, title, reguler_price, discount, promotedUntil } = deal?.deal || {};
    const image = deal?.deal?.images?.[0];
    const { regularPrice: price, finalPrice, discount: dealDiscount, hasDiscount } = getDealPricing(reguler_price, discount);
    const distance = Number(deal?.distance) || 0;
    const distanceMiles = distance / 1609.344;

    return (
        <Link to={`/deal-details/${_id}`} className="flex h-full flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-hover hover:shadow-md">
            <div className="relative h-48 w-full">
                <img
                    src={image || "/no-image.png"}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {dealDiscount}% off
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-[#262626] line-clamp-2 min-h-10 leading-tight">
                    {title}
                </h3>

                <div className="mt-2 flex min-w-0 items-center gap-1 text-sm text-[#A3A3A3]">
                    <Store size={17} className="shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 truncate">{deal?.shop?.business_name}</span>
                </div>

                <div className="mt-3 flex min-w-0 flex-col items-start justify-between gap-2">
                    <div className="flex min-w-0 items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-xl font-bold text-[#262626]">
                            ${finalPrice.toFixed(2)}
                        </span>

                        {hasDiscount && (
                            <span className="text-sm text-[#A3A3A3] font-medium line-through">
                                ${price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="inline-flex max-w-[calc(100%-1.5rem)] items-center gap-0.5 py-1 text-[13px] font-bold text-primary ring-white/70">
                        <MapPin size={14} className="shrink-0" aria-hidden="true" />
                        <span className="truncate mt-0.5">{distanceMiles.toFixed(2)} miles away</span>
                    </div>
                    <Countdown countdown={promotedUntil} />
                </div>

                <span className="mt-auto block w-full bg-primary hover:bg-secondary text-white text-center font-semibold py-2.5 rounded-full transition-colors text-sm cursor-pointer">
                    Redeem Now
                </span>
            </div>
        </Link>
    );
};

export default DealCard;
