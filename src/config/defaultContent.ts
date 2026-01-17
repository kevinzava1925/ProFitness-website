import { DEFAULT_IMAGES } from "./defaultImages";

export const DEFAULT_CONTENT = {
  hero: {
    url: DEFAULT_IMAGES.hero,
    type: "image" as const,
  },
  classes: [
    { id: "1", name: "MUAY THAI", image: DEFAULT_IMAGES.classes.muayThai, description: "Traditional Thai Boxing" },
    { id: "2", name: "FITNESS", image: DEFAULT_IMAGES.classes.fitness, description: "Strength and Conditioning" },
    { id: "3", name: "MMA", image: DEFAULT_IMAGES.classes.mma, description: "Mixed Martial Arts" },
    { id: "4", name: "BJJ", image: DEFAULT_IMAGES.classes.bjj, description: "Brazilian Jiu-Jitsu" },
    { id: "5", name: "BOXING", image: DEFAULT_IMAGES.classes.boxing, description: "Western Boxing" },
    { id: "6", name: "RECOVERY", image: DEFAULT_IMAGES.classes.recovery, description: "Yoga and Massage" },
  ],
  events: [
    { id: "1", name: "Fitness Workshop", image: DEFAULT_IMAGES.events.event1, date: "Every Saturday", description: "Weekly workshop to improve your form." },
    { id: "2", name: "Member Appreciation Day", image: DEFAULT_IMAGES.events.event2, date: "First Sunday of Each Month", description: "Celebrating our members with perks and giveaways." },
    { id: "3", name: "Nutrition Seminar", image: DEFAULT_IMAGES.events.event3, date: "Monthly", description: "Learn about proper nutrition and meal planning." },
  ],
  shop: [
    { id: "1", name: "T-Shirt", image: DEFAULT_IMAGES.shop.tshirt },
    { id: "2", name: "Hoodie", image: DEFAULT_IMAGES.shop.hoodie },
    { id: "3", name: "Cap", image: DEFAULT_IMAGES.shop.cap },
    { id: "4", name: "Duffle Bag", image: DEFAULT_IMAGES.shop.duffle },
  ],
  partners: [
    { id: "1", name: "GEMMAF", image: DEFAULT_IMAGES.partners.gemmaf },
    { id: "2", name: "AMMAG", image: DEFAULT_IMAGES.partners.ammag },
  ],
  trainers: [
    { id: "1", name: "John Smith", image: DEFAULT_IMAGES.trainers.trainer1, specialty: "Strength Training" },
    { id: "2", name: "Sarah Johnson", image: DEFAULT_IMAGES.trainers.trainer2, specialty: "Yoga & Flexibility" },
    { id: "3", name: "Mike Chen", image: DEFAULT_IMAGES.trainers.trainer3, specialty: "HIIT & Cardio" },
    { id: "4", name: "Emma Wilson", image: DEFAULT_IMAGES.trainers.trainer4, specialty: "Nutrition & Wellness" },
  ],
  amenities: [
    { id: "1", name: "Locker Rooms", image: DEFAULT_IMAGES.amenities.locker, description: "Spacious locker rooms with showers and changing facilities" },
    { id: "2", name: "Cardio Equipment", image: DEFAULT_IMAGES.amenities.cardio, description: "State-of-the-art cardio machines" },
    { id: "3", name: "Free Weights", image: DEFAULT_IMAGES.amenities.weights, description: "Comprehensive free weights area" },
    { id: "4", name: "Group Classes", image: DEFAULT_IMAGES.amenities.classes, description: "Studios for various classes" },
    { id: "5", name: "Personal Training", image: DEFAULT_IMAGES.amenities.training, description: "Certified personal trainers" },
    { id: "6", name: "Sauna & Steam Room", image: DEFAULT_IMAGES.amenities.sauna, description: "Relaxation facilities for recovery" },
  ],
  collaborations: [
    { id: "1", name: "Fitness Brand A", image: DEFAULT_IMAGES.collaborations.brandA, description: "Premium fitness equipment and gear" },
    { id: "2", name: "Nutrition Company B", image: DEFAULT_IMAGES.collaborations.brandB, description: "Health supplements and nutrition products" },
  ],
  classSchedule: [
    { id: "1", name: "Morning Yoga", instructor: "Sarah Johnson", time: "07:00", day: "Monday", duration: "60 min", level: "All Levels" },
    { id: "2", name: "HIIT Training", instructor: "Mike Chen", time: "08:00", day: "Monday", duration: "45 min", level: "Intermediate" },
    { id: "3", name: "Strength Training", instructor: "David Martinez", time: "18:00", day: "Monday", duration: "60 min", level: "All Levels" },
    { id: "4", name: "Cardio Blast", instructor: "Emma Wilson", time: "07:00", day: "Tuesday", duration: "45 min", level: "Beginner" },
    { id: "5", name: "Pilates", instructor: "Sarah Johnson", time: "19:00", day: "Tuesday", duration: "50 min", level: "All Levels" },
  ],
};



