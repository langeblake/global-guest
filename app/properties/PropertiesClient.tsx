'use client';

import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listing deleted')
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('')
        })
    }, [router])

  return (
    <Container>
        <Heading 
            title="Properties"
            subtitle="List of your properties"
        />
        <div 
            className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
        >
            {reservations.map((reservation) => (
                <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId == reservation.id}
                    actionLabel="Cancel reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>


  )
}

export default PropertiesClient;