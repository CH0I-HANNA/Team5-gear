import { User } from './auth';

export interface EquipmentForReview {
    id: number;
    name: string; // Assuming equipment has a name
    // Add other relevant equipment fields if needed
}

export interface Review {
    id: number;
    title: string; // From Review.java
    content: string;
    rating: number; // From Review.java
    createdAt: string;
    updatedAt: string; // From Review.java
    equipment: EquipmentForReview; // Relationship to Equipment
    user: User;
}