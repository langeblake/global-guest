"use client";

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser, SafeListing } from "@/app/types";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (iod: string) => void;
  disabled: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  // The useCallback hook is used here to memoize the handleCancel function.
  // Its dependencies (onAction, actionId, and disabled) are specified in the dependency array.
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  // By wrapping this calculation with useMemo, it ensures that the price is only recalculated when either reservation or data.price changes.
  // This prevents unnecessary recalculations during re-renders if these dependencies remain the same.
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
                col-span-1 cursor-pointer group
            "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
