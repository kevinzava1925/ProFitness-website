'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type ContentItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
  date?: string;
  price?: string;
  benefits?: string[];
  trainer?: string;
  schedule?: string[];
  headerImage?: string;
};

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
};

type FooterData = {
  gymName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  copyright: string;
};

type CollaborationItem = {
  id: string;
  name: string;
  image: string;
  description?: string;
};

type Trainer = {
  id: string;
  name: string;
  image: string;
  specialty: string;
  bio?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
};

type HeroMedia = {
  url: string;
  type: 'image' | 'video';
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'homepage' | 'classes' | 'events' | 'shop' | 'partners' | 'pricing' | 'footer' | 'collaborations' | 'trainers' | 'amenities'>('homepage');
  const [classes, setClasses] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [shopItems, setShopItems] = useState<ContentItem[]>([]);
  const [partners, setPartners] = useState<ContentItem[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [collaborations, setCollaborations] = useState<CollaborationItem[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [amenities, setAmenities] = useState<ContentItem[]>([]);
  const [heroMedia, setHeroMedia] = useState<HeroMedia | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [editingFooter, setEditingFooter] = useState(false);
  const [editingCollaboration, setEditingCollaboration] = useState<CollaborationItem | null>(null);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadField, setUploadField] = useState<string | null>(null);

  // Image upload function - Upload to Cloudinary
  const handleImageUpload = async (file: File, fieldName: string) => {
    if (!file) return;

    // Check file type - reject unsupported formats
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    const unsupportedFormats = ['heic', 'heif', 'raw', 'cr2', 'nef', 'orf', 'sr2'];
    
    if (unsupportedFormats.includes(fileExtension || '')) {
      alert(`Unsupported file format: .${fileExtension}\n\nPlease convert your image to JPG, PNG, or WEBP format.\n\nFor HEIC files from iPhone:\n- Use "Convert to JPEG" on iPhone\n- Or use an online converter like heictojpg.com`);
      return;
    }

    // Check if it's a valid image type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validImageTypes.includes(file.type) && !file.type.startsWith('image/')) {
      alert(`Invalid file type: ${file.type}\n\nPlease upload a JPG, PNG, GIF, WEBP, or SVG image.`);
      return;
    }

    // Check file size (200MB limit for images - Cloudinary supports larger files)
    const maxSize = 200 * 1024 * 1024; // 200MB in bytes
    if (file.size > maxSize) {
      alert(`File is too large. Maximum size is 200MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    setUploading(true);
    setUploadField(fieldName);

    try {
      // For files over 2MB, use direct Cloudinary upload to bypass Netlify body size limits
      const useDirectUpload = file.size > 2 * 1024 * 1024; // 2MB threshold
      
      let imageUrl: string;
      
      if (useDirectUpload) {
        // Direct upload to Cloudinary (bypasses Netlify limits)
        const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
        
        // Get upload signature
        const sigResponse = await fetch(`/api/upload-signature?resource_type=${resourceType}`);
        if (!sigResponse.ok) {
          throw new Error('Failed to get upload signature');
        }
        const sigData = await sigResponse.json();
        
        // Create FormData for Cloudinary direct upload
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('api_key', sigData.apiKey);
        uploadFormData.append('timestamp', sigData.timestamp.toString());
        uploadFormData.append('signature', sigData.signature);
        uploadFormData.append('folder', sigData.folder);
        if (resourceType !== 'image') {
          uploadFormData.append('resource_type', resourceType);
        }
        
        // Upload directly to Cloudinary
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`,
          {
            method: 'POST',
            body: uploadFormData,
          }
        );
        
        if (!cloudinaryResponse.ok) {
          const errorText = await cloudinaryResponse.text();
          throw new Error(`Cloudinary upload failed: ${errorText}`);
        }
        
        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url || cloudinaryData.url;
      } else {
        // Use API route for smaller files (faster)
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-direct', {
          method: 'POST',
          body: formData,
        });

        // Read response once
        const responseText = await response.text();
        
        if (!response.ok) {
          let errorMessage = `Upload failed with status ${response.status}`;
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch (parseError) {
            errorMessage = responseText || errorMessage;
          }
          console.error('Cloudinary upload error:', { 
            status: response.status, 
            message: errorMessage,
            responseText 
          });
          throw new Error(errorMessage);
        }

        // Parse the successful response
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse upload response:', responseText);
          throw new Error('Invalid response from server');
        }
        
        if (!data.url && !data.secure_url) {
          console.error('Upload response missing URL:', data);
          throw new Error('No URL returned from Cloudinary');
        }
        
        imageUrl = data.url || data.secure_url;
      }
      
      // Update the appropriate field based on what we're editing
      if (activeTab === 'trainers' && editingTrainer) {
        setEditingTrainer({ ...editingTrainer, [fieldName]: imageUrl });
      } else if (activeTab === 'collaborations' && editingCollaboration) {
        setEditingCollaboration({ ...editingCollaboration, [fieldName]: imageUrl });
      } else if (editingItem) {
        setEditingItem({ ...editingItem, [fieldName]: imageUrl });
      }
      
      // Show success message
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image. Please try again.';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
      setUploadField(null);
    }
  };

  // Handle hero media upload (image or video) - Upload to Cloudinary
  const handleHeroMediaUpload = async (file: File) => {
    if (!file) return;

    // Check if it's an image or video
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Please upload an image or video file');
      return;
    }

    // Check file size (200MB for images, 500MB for videos - Cloudinary supports larger files)
    const maxSize = isVideo ? 500 * 1024 * 1024 : 200 * 1024 * 1024; // 500MB for videos, 200MB for images
    if (file.size > maxSize) {
      const maxSizeMB = isVideo ? 500 : 200;
      alert(`File is too large. Maximum size is ${maxSizeMB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    setUploading(true);
    setUploadField('heroMedia');

    try {
      // For files over 2MB, use direct Cloudinary upload to bypass Netlify body size limits
      const useDirectUpload = file.size > 2 * 1024 * 1024; // 2MB threshold
      
      let mediaUrl: string;
      let resourceType: string;
      
      if (useDirectUpload) {
        // Direct upload to Cloudinary (bypasses Netlify limits)
        resourceType = isVideo ? 'video' : 'image';
        
        // Get upload signature
        const sigResponse = await fetch(`/api/upload-signature?resource_type=${resourceType}`);
        if (!sigResponse.ok) {
          throw new Error('Failed to get upload signature');
        }
        const sigData = await sigResponse.json();
        
        // Create FormData for Cloudinary direct upload
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('api_key', sigData.apiKey);
        uploadFormData.append('timestamp', sigData.timestamp.toString());
        uploadFormData.append('signature', sigData.signature);
        uploadFormData.append('folder', sigData.folder);
        if (resourceType !== 'image') {
          uploadFormData.append('resource_type', resourceType);
        }
        
        // Upload directly to Cloudinary
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`,
          {
            method: 'POST',
            body: uploadFormData,
          }
        );
        
        if (!cloudinaryResponse.ok) {
          const errorText = await cloudinaryResponse.text();
          throw new Error(`Cloudinary upload failed: ${errorText}`);
        }
        
        const cloudinaryData = await cloudinaryResponse.json();
        mediaUrl = cloudinaryData.secure_url || cloudinaryData.url;
      } else {
        // Use API route for smaller files (faster)
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-direct', {
          method: 'POST',
          body: formData,
        });

        // Read response once
        const responseText = await response.text();
        
        if (!response.ok) {
          let errorMessage = `Upload failed with status ${response.status}`;
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch (parseError) {
            errorMessage = responseText || errorMessage;
          }
          console.error('Cloudinary upload error:', { 
            status: response.status, 
            message: errorMessage,
            responseText 
          });
          throw new Error(errorMessage);
        }

        // Parse the successful response
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse upload response:', responseText);
          throw new Error('Invalid response from server');
        }
        
        if (!data.url && !data.secure_url) {
          console.error('Upload response missing URL:', data);
          throw new Error('No URL returned from Cloudinary');
        }
        
        mediaUrl = data.url || data.secure_url;
        resourceType = data.type || (isVideo ? 'video' : 'image');
      }
      
      const newHeroMedia: HeroMedia = {
        url: mediaUrl,
        type: resourceType as 'image' | 'video'
      };

      setHeroMedia(newHeroMedia);
      await saveContentToAPI('hero', newHeroMedia);
      alert('Homepage hero media updated successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload media. Please try again.';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
      setUploadField(null);
    }
  };

  // Helper function to save content to Supabase API - NO localStorage fallback for syncing
  const saveContentToAPI = async (type: string, data: ContentItem[] | PricingPlan[] | FooterData | HeroMedia | CollaborationItem[] | Trainer[]) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to save content';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving to API:', error);
      // DO NOT fallback to localStorage - this breaks syncing across devices
      // Always throw error so user knows save failed
      throw error;
    }
  };

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin");
    }
  }, [router]);

  // Load data from API (with localStorage fallback)
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try to load from API
        const response = await fetch('/api/content');
        if (response.ok) {
          const allContent = await response.json();
          
          // Set each content type
          if (allContent.classes && Array.isArray(allContent.classes)) setClasses(allContent.classes);
          if (allContent.events && Array.isArray(allContent.events)) setEvents(allContent.events);
          if (allContent.shop && Array.isArray(allContent.shop)) setShopItems(allContent.shop);
          if (allContent.partners && Array.isArray(allContent.partners)) setPartners(allContent.partners);
          if (allContent.pricing && Array.isArray(allContent.pricing)) setPricingPlans(allContent.pricing);
          // Footer and hero are single objects, not arrays
          if (allContent.footer && typeof allContent.footer === 'object') setFooterData(allContent.footer);
          if (allContent.collaborations && Array.isArray(allContent.collaborations)) setCollaborations(allContent.collaborations);
          if (allContent.trainers && Array.isArray(allContent.trainers)) setTrainers(allContent.trainers);
          if (allContent.amenities && Array.isArray(allContent.amenities)) setAmenities(allContent.amenities);
          if (allContent.hero && typeof allContent.hero === 'object' && allContent.hero.url) setHeroMedia(allContent.hero);
          
          return; // Successfully loaded from API
        }
      } catch (error) {
        console.error('Error loading from API, falling back to localStorage:', error);
      }

      // Fallback to localStorage
      const loadedClasses = localStorage.getItem("classes");
      const loadedEvents = localStorage.getItem("events");
      const loadedShop = localStorage.getItem("shopItems");
      const loadedPartners = localStorage.getItem("partners");

      if (loadedClasses) setClasses(JSON.parse(loadedClasses));
      else {
        const defaultClasses = [
          { id: '1', name: 'MUAY THAI', image: 'https://ext.same-assets.com/443545936/1729744263.webp', description: 'Traditional Thai Boxing' },
          { id: '2', name: 'FITNESS', image: 'https://ext.same-assets.com/443545936/691732246.webp', description: 'Strength and Conditioning' },
          { id: '3', name: 'MMA', image: 'https://ext.same-assets.com/443545936/1129713061.webp', description: 'Mixed Martial Arts' },
          { id: '4', name: 'BJJ', image: 'https://ext.same-assets.com/443545936/1537262654.webp', description: 'Brazilian Jiu-Jitsu' },
          { id: '5', name: 'BOXING', image: 'https://ext.same-assets.com/443545936/1553179705.webp', description: 'Western Boxing' },
          { id: '6', name: 'RECOVERY', image: 'https://ext.same-assets.com/443545936/1443978950.webp', description: 'Yoga and Massage' }
        ];
        setClasses(defaultClasses);
      }

      if (loadedEvents) setEvents(JSON.parse(loadedEvents));
      else {
        const defaultEvents = [
          { id: '1', name: 'Intro to Martial Arts for FLINTA*', image: 'https://ext.same-assets.com/443545936/832029173.jpeg', date: 'SAMSTAG & SONNTAG', description: 'Das Wochenendseminar von und für FLINTA*s zur Einführung in den Kampfsport.' },
          { id: '2', name: 'Fightchallenge Round Six', image: 'https://ext.same-assets.com/443545936/4036118501.jpeg', date: '6.12.25', description: 'Wir präsentieren "FightChallenge - Round Six' },
          { id: '3', name: 'Defensive Boxing Wrestling for MMA', image: 'https://ext.same-assets.com/443545936/2651900096.jpeg', date: '13.12.25', description: 'Join and learn all about boxing and wrestling for MMA.' }
        ];
        setEvents(defaultEvents);
      }

      if (loadedShop) setShopItems(JSON.parse(loadedShop));
      else {
        const defaultShop = [
          { id: '1', name: 'Cap', image: 'https://ext.same-assets.com/443545936/1859491465.webp' },
          { id: '2', name: 'Duffle Bag', image: 'https://ext.same-assets.com/443545936/3860077197.webp' },
          { id: '3', name: 'T-Shirt', image: 'https://ext.same-assets.com/443545936/2710426474.webp' },
          { id: '4', name: 'Hoodie', image: 'https://ext.same-assets.com/443545936/480816838.webp' }
        ];
        setShopItems(defaultShop);
      }

      if (loadedPartners) setPartners(JSON.parse(loadedPartners));
      else {
        const defaultPartners = [
          { id: '1', name: 'GEMMAF', image: 'https://ext.same-assets.com/443545936/2709833716.webp' },
          { id: '2', name: 'AMMAG', image: 'https://ext.same-assets.com/443545936/59465891.webp' }
        ];
        setPartners(defaultPartners);
      }

      const loadedPricing = localStorage.getItem("pricingPlans");
      if (loadedPricing) {
        setPricingPlans(JSON.parse(loadedPricing));
      } else {
        const defaultPricing: PricingPlan[] = [
          {
            id: '1',
            name: 'Basic',
            price: '$49',
            period: 'per month',
            features: ['Access to all group classes', 'Gym equipment access', 'Locker room facilities', 'Free parking']
          },
          {
            id: '2',
            name: 'Premium',
            price: '$79',
            period: 'per month',
            features: ['Everything in Basic', 'Priority class booking', '1 personal training session/month', 'Nutrition consultation', 'Guest passes (2/month)'],
            popular: true
          },
          {
            id: '3',
            name: 'Elite',
            price: '$129',
            period: 'per month',
            features: ['Everything in Premium', 'Unlimited personal training', '24/7 gym access', 'Towel service', 'Unlimited guest passes', 'Complimentary supplements']
          }
        ];
        setPricingPlans(defaultPricing);
      }

      const loadedFooter = localStorage.getItem("footerData");
      if (loadedFooter) {
        setFooterData(JSON.parse(loadedFooter));
      } else {
        const defaultFooter: FooterData = {
          gymName: 'ProFitness Gym',
          address: '123 Fitness Street',
          city: 'City, State 12345',
          phone: '(123) 456-7890',
          email: 'info@profitness.com',
          hoursWeekday: '06 AM - 10 PM',
          hoursSaturday: '08 AM - 8 PM',
          hoursSunday: '09 AM - 6 PM',
          instagramUrl: '#',
          facebookUrl: '#',
          youtubeUrl: '#',
          tiktokUrl: '#',
          copyright: 'Copyright ProFitness Gym 2025'
        };
        setFooterData(defaultFooter);
      }

      const loadedCollaborations = localStorage.getItem("collaborations");
      if (loadedCollaborations) {
        setCollaborations(JSON.parse(loadedCollaborations));
      } else {
        const defaultCollaborations: CollaborationItem[] = [
          { id: '1', name: 'Fitness Brand A', image: 'https://ext.same-assets.com/443545936/1859491465.webp', description: 'Premium fitness equipment and gear' },
          { id: '2', name: 'Nutrition Company B', image: 'https://ext.same-assets.com/443545936/3860077197.webp', description: 'Health supplements and nutrition products' }
        ];
        setCollaborations(defaultCollaborations);
      }

      const loadedTrainers = localStorage.getItem("trainers");
      if (loadedTrainers) {
        setTrainers(JSON.parse(loadedTrainers));
      } else {
        const defaultTrainers: Trainer[] = [
          { 
            id: '1', 
            name: 'John Smith', 
            image: 'https://ext.same-assets.com/443545936/1729744263.webp', 
            specialty: 'Strength Training',
            bio: 'With over 10 years of experience in strength training and bodybuilding, John helps clients build muscle and achieve their fitness goals.',
            instagramUrl: '#',
            facebookUrl: '#'
          },
          { 
            id: '2', 
            name: 'Sarah Johnson', 
            image: 'https://ext.same-assets.com/443545936/691732246.webp', 
            specialty: 'Yoga & Flexibility',
            bio: 'Certified yoga instructor specializing in flexibility, mobility, and mindfulness practices for overall wellness.',
            instagramUrl: '#',
            linkedinUrl: '#'
          }
        ];
        setTrainers(defaultTrainers);
      }

      const loadedAmenities = localStorage.getItem("amenities");
      if (loadedAmenities) {
        setAmenities(JSON.parse(loadedAmenities));
      } else {
        const defaultAmenities: ContentItem[] = [
          { id: '1', name: 'Locker Rooms', image: 'https://ext.same-assets.com/443545936/1729744263.webp', description: 'Spacious locker rooms with showers and changing facilities' },
          { id: '2', name: 'Cardio Equipment', image: 'https://ext.same-assets.com/443545936/691732246.webp', description: 'State-of-the-art cardio machines including treadmills, bikes, and ellipticals' },
          { id: '3', name: 'Free Weights', image: 'https://ext.same-assets.com/443545936/1129713061.webp', description: 'Comprehensive free weights area with dumbbells, barbells, and plates' },
          { id: '4', name: 'Group Classes', image: 'https://ext.same-assets.com/443545936/1537262654.webp', description: 'Multiple group fitness studios for various classes' },
          { id: '5', name: 'Personal Training', image: 'https://ext.same-assets.com/443545936/1553179705.webp', description: 'Private training areas with certified personal trainers' },
          { id: '6', name: 'Sauna & Steam Room', image: 'https://ext.same-assets.com/443545936/1443978950.webp', description: 'Relaxation facilities for post-workout recovery' }
        ];
        setAmenities(defaultAmenities);
      }

      const loadedHeroMedia = localStorage.getItem("homepageHero");
      if (loadedHeroMedia) {
        setHeroMedia(JSON.parse(loadedHeroMedia));
      } else {
        const defaultHero: HeroMedia = {
          url: "https://ext.same-assets.com/443545936/3789989498.webp",
          type: "image"
        };
        setHeroMedia(defaultHero);
      }
    };

    loadContent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'classes': return classes;
      case 'events': return events;
      case 'shop': return shopItems;
      case 'partners': return partners;
      case 'amenities': return amenities;
      default: return [];
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const updateState = (items: ContentItem[]) => items.filter(item => item.id !== id);

    try {
      switch (activeTab) {
        case 'classes':
          const newClasses = updateState(classes);
          setClasses(newClasses);
          await saveContentToAPI('classes', newClasses);
          break;
        case 'events':
          const newEvents = updateState(events);
          setEvents(newEvents);
          await saveContentToAPI('events', newEvents);
          break;
        case 'shop':
          const newShop = updateState(shopItems);
          setShopItems(newShop);
          await saveContentToAPI('shop', newShop);
          break;
        case 'partners':
          const newPartners = updateState(partners);
          setPartners(newPartners);
          await saveContentToAPI('partners', newPartners);
          break;
        case 'amenities':
          const newAmenities = updateState(amenities);
          setAmenities(newAmenities);
          await saveContentToAPI('amenities', newAmenities);
          break;
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setEditingItem({
      id: Date.now().toString(),
      name: '',
      image: '',
      description: '',
      date: '',
      benefits: [],
      trainer: '',
      schedule: [],
      headerImage: ''
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    const updateItems = (items: ContentItem[]) => {
      const exists = items.find(item => item.id === editingItem.id);
      if (exists) {
        return items.map(item => item.id === editingItem.id ? editingItem : item);
      } else {
        return [...items, editingItem];
      }
    };

    try {
      switch (activeTab) {
        case 'classes':
          const newClasses = updateItems(classes);
          setClasses(newClasses);
          await saveContentToAPI('classes', newClasses);
          break;
        case 'events':
          const newEvents = updateItems(events);
          setEvents(newEvents);
          await saveContentToAPI('events', newEvents);
          break;
        case 'shop':
          const newShop = updateItems(shopItems);
          setShopItems(newShop);
          await saveContentToAPI('shop', newShop);
          break;
        case 'partners':
          const newPartners = updateItems(partners);
          setPartners(newPartners);
          await saveContentToAPI('partners', newPartners);
          break;
        case 'amenities':
          const newAmenities = updateItems(amenities);
          setAmenities(newAmenities);
          await saveContentToAPI('amenities', newAmenities);
          break;
      }

      setIsEditing(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;
    try {
      const newPlans = pricingPlans.filter(plan => plan.id !== id);
      setPricingPlans(newPlans);
      await saveContentToAPI('pricing', newPlans);
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert('Failed to delete plan. Please try again.');
    }
  };

  const handleAddPlan = () => {
    setEditingPlan({
      id: Date.now().toString(),
      name: '',
      price: '',
      period: 'per month',
      features: [],
      popular: false
    });
    setIsEditing(true);
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setIsEditing(true);
  };

  const handleSavePlan = async () => {
    if (!editingPlan) return;

    try {
      const exists = pricingPlans.find(plan => plan.id === editingPlan.id);
      let newPlans: PricingPlan[];
      
      if (exists) {
        newPlans = pricingPlans.map(plan => plan.id === editingPlan.id ? editingPlan : plan);
      } else {
        newPlans = [...pricingPlans, editingPlan];
      }

      setPricingPlans(newPlans);
      await saveContentToAPI('pricing', newPlans);
      setIsEditing(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan. Please try again.');
    }
  };

  const handleSaveFooter = async () => {
    if (!footerData) return;
    try {
      await saveContentToAPI('footer', footerData);
      setEditingFooter(false);
    } catch (error) {
      console.error('Error saving footer:', error);
      alert('Failed to save footer. Please try again.');
    }
  };

  const addFeatureToPlan = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, '']
    });
  };

  const updatePlanFeature = (index: number, value: string) => {
    if (!editingPlan) return;
    const newFeatures = [...editingPlan.features];
    newFeatures[index] = value;
    setEditingPlan({
      ...editingPlan,
      features: newFeatures
    });
  };

  const removePlanFeature = (index: number) => {
    if (!editingPlan) return;
    const newFeatures = editingPlan.features.filter((_, i) => i !== index);
    setEditingPlan({
      ...editingPlan,
      features: newFeatures
    });
  };

  // Collaboration handlers
  const handleAddCollaboration = () => {
    setEditingCollaboration({
      id: Date.now().toString(),
      name: '',
      image: '',
      description: ''
    });
    setIsEditing(true);
  };

  const handleEditCollaboration = (collab: CollaborationItem) => {
    setEditingCollaboration(collab);
    setIsEditing(true);
  };

  const handleSaveCollaboration = async () => {
    if (!editingCollaboration) return;
    try {
      const exists = collaborations.find(c => c.id === editingCollaboration.id);
      let newCollaborations: CollaborationItem[];
      
      if (exists) {
        newCollaborations = collaborations.map(c => c.id === editingCollaboration.id ? editingCollaboration : c);
      } else {
        newCollaborations = [...collaborations, editingCollaboration];
      }

      setCollaborations(newCollaborations);
      await saveContentToAPI('collaborations', newCollaborations);
      setIsEditing(false);
      setEditingCollaboration(null);
    } catch (error) {
      console.error('Error saving collaboration:', error);
      alert('Failed to save collaboration. Please try again.');
    }
  };

  const handleDeleteCollaboration = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collaboration?')) return;
    try {
      const newCollaborations = collaborations.filter(c => c.id !== id);
      setCollaborations(newCollaborations);
      await saveContentToAPI('collaborations', newCollaborations);
    } catch (error) {
      console.error('Error deleting collaboration:', error);
      alert('Failed to delete collaboration. Please try again.');
    }
  };

  // Trainer handlers
  const handleAddTrainer = () => {
    setEditingTrainer({
      id: Date.now().toString(),
      name: '',
      image: '',
      specialty: '',
      bio: '',
      instagramUrl: '',
      facebookUrl: '',
      twitterUrl: '',
      linkedinUrl: ''
    });
    setIsEditing(true);
  };

  const handleEditTrainer = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setIsEditing(true);
  };

  const handleSaveTrainer = async () => {
    if (!editingTrainer) return;
    try {
      const exists = trainers.find(t => t.id === editingTrainer.id);
      let newTrainers: Trainer[];
      
      if (exists) {
        newTrainers = trainers.map(t => t.id === editingTrainer.id ? editingTrainer : t);
      } else {
        newTrainers = [...trainers, editingTrainer];
      }

      setTrainers(newTrainers);
      await saveContentToAPI('trainers', newTrainers);
      setIsEditing(false);
      setEditingTrainer(null);
    } catch (error) {
      console.error('Error saving trainer:', error);
      alert('Failed to save trainer. Please try again.');
    }
  };

  const handleDeleteTrainer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trainer?')) return;
    try {
      const newTrainers = trainers.filter(t => t.id !== id);
      setTrainers(newTrainers);
      await saveContentToAPI('trainers', newTrainers);
    } catch (error) {
      console.error('Error deleting trainer:', error);
      alert('Failed to delete trainer. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="https://res.cloudinary.com/dvdogsvf6/image/upload/v1763919430/Pro_Fitness_logo_ldvjyt.png"
                alt="ProFitness"
                width={180}
                height={72}
                className="h-12 sm:h-16 w-auto brightness-0 invert"
              />
              <span className="text-sm font-semibold uppercase">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm hover:text-gray-300 transition-colors uppercase">
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 text-sm font-bold uppercase hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {(['homepage', 'classes', 'events', 'shop', 'partners', 'pricing', 'footer', 'collaborations', 'trainers', 'amenities'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold uppercase border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'homepage' ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold uppercase mb-4">Homepage Hero Media</h2>
                <p className="text-gray-600 mb-6">
                  Upload an image or video to display as the hero section on the homepage. The media will be automatically scaled for both desktop and mobile viewing.
                </p>

                {heroMedia && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Current Hero Media</h3>
                    <div className="border-2 border-gray-200 rounded-lg overflow-hidden max-w-4xl">
                      {heroMedia.type === 'video' ? (
                        <video
                          src={heroMedia.url}
                          controls
                          className="w-full h-auto max-h-96 object-cover"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={heroMedia.url}
                            alt="Homepage Hero"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4 bg-gray-50">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Type:</span> {heroMedia.type === 'video' ? 'Video' : 'Image'}
                        </p>
                        <p className="text-sm text-gray-600 break-all">
                          <span className="font-semibold">URL:</span> {heroMedia.url}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleHeroMediaUpload(file);
                        }
                      }}
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className="space-y-4">
                      {uploading && uploadField === 'heroMedia' ? (
                        <div className="space-y-2">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                          <p className="text-gray-600">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div>
                            <p className="text-lg font-semibold text-gray-700 mb-1">
                              Click to upload hero media
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports images (JPG, PNG, WEBP) and videos (MP4, WEBM)
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Media will be automatically optimized for desktop and mobile viewing
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Tips:</h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>For best results, use high-quality images (1920x1080 or larger)</li>
                    <li>Videos should be in MP4 or WEBM format for best browser compatibility</li>
                    <li>The media will automatically scale to fit different screen sizes</li>
                    <li>Videos will autoplay, loop, and be muted for better user experience</li>
                  </ul>
                </div>
              </div>
            </>
          ) : activeTab === 'pricing' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold uppercase">Manage Pricing Plans</h2>
                <button
                  onClick={handleAddPlan}
                  className="bg-black text-white px-6 py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                >
                  Add New Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <div key={plan.id} className={`border-2 rounded-lg overflow-hidden ${plan.popular ? 'border-black' : 'border-gray-200'}`}>
                    {plan.popular && (
                      <div className="bg-black text-white text-center py-2 text-xs font-bold uppercase">
                        Most Popular
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-black">{plan.price}</span>
                        <span className="text-gray-600 ml-2 text-sm">{plan.period}</span>
                      </div>
                      <ul className="space-y-2 mb-4 text-sm">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPlan(plan)}
                          className="flex-1 bg-black text-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeTab === 'footer' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold uppercase">Manage Footer</h2>
                <button
                  onClick={() => setEditingFooter(true)}
                  className="bg-black text-white px-6 py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                >
                  Edit Footer
                </button>
              </div>

              {footerData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold mb-2">Gym Name</h3>
                      <p className="text-gray-700">{footerData.gymName}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Address</h3>
                      <p className="text-gray-700">{footerData.address}</p>
                      <p className="text-gray-700">{footerData.city}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Phone</h3>
                      <p className="text-gray-700">{footerData.phone}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <p className="text-gray-700">{footerData.email}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Weekday Hours</h3>
                      <p className="text-gray-700">{footerData.hoursWeekday}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Saturday Hours</h3>
                      <p className="text-gray-700">{footerData.hoursSaturday}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Sunday Hours</h3>
                      <p className="text-gray-700">{footerData.hoursSunday}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Copyright</h3>
                      <p className="text-gray-700">{footerData.copyright}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeTab === 'collaborations' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold uppercase">Manage Collaborations</h2>
                <button
                  onClick={handleAddCollaboration}
                  className="bg-black text-white px-6 py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                >
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collaborations.map((collab) => (
                  <div key={collab.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={collab.image}
                        alt={collab.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{collab.name}</h3>
                      {collab.description && <p className="text-sm text-gray-600 mb-4">{collab.description}</p>}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCollaboration(collab)}
                          className="flex-1 bg-black text-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCollaboration(collab.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeTab === 'trainers' ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold uppercase">Manage Personal Trainers</h2>
                <button
                  onClick={handleAddTrainer}
                  className="bg-black text-white px-6 py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                >
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{trainer.name}</h3>
                      <p className="text-sm text-profitness-brown font-semibold mb-2">{trainer.specialty}</p>
                      {trainer.bio && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{trainer.bio}</p>}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTrainer(trainer)}
                          className="flex-1 bg-black text-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTrainer(trainer.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold uppercase">Manage {activeTab}</h2>
                <button
                  onClick={handleAdd}
                  className="bg-black text-white px-6 py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                >
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCurrentItems().map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      {item.date && <p className="text-sm text-gray-600 mb-2">{item.date}</p>}
                      {item.description && <p className="text-sm text-gray-600 mb-4">{item.description}</p>}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 bg-black text-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Modal for Collaborations */}
      {isEditing && editingCollaboration && activeTab === 'collaborations' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold uppercase mb-6">
              {editingCollaboration.id && collaborations.find(c => c.id === editingCollaboration.id) ? 'Edit' : 'Add'} Collaboration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Brand Name</label>
                <input
                  type="text"
                  value={editingCollaboration.name}
                  onChange={(e) => setEditingCollaboration({ ...editingCollaboration, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingCollaboration.image}
                    onChange={(e) => setEditingCollaboration({ ...editingCollaboration, image: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://... or upload image"
                  />
                  <label className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap">
                    {uploading && uploadField === 'image' ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'image');
                        // Reset input so same file can be selected again
                        e.target.value = '';
                      }}
                      disabled={uploading}
                    />
                  </label>
                </div>
                {editingCollaboration.image && (
                  <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden max-w-md">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={editingCollaboration.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          console.error('Image preview error:', e);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={editingCollaboration.description || ''}
                  onChange={(e) => setEditingCollaboration({ ...editingCollaboration, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveCollaboration}
                className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingCollaboration(null);
                }}
                className="flex-1 bg-gray-200 text-black px-6 py-3 font-bold uppercase hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Trainers */}
      {isEditing && editingTrainer && activeTab === 'trainers' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold uppercase mb-6">
              {editingTrainer.id && trainers.find(t => t.id === editingTrainer.id) ? 'Edit' : 'Add'} Trainer
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editingTrainer.name}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Photo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingTrainer.image}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, image: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://... or upload image"
                  />
                  <label className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap">
                    {uploading && uploadField === 'image' ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'image');
                        // Reset input so same file can be selected again
                        e.target.value = '';
                      }}
                      disabled={uploading}
                    />
                  </label>
                </div>
                {editingTrainer.image && (
                  <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden max-w-md">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={editingTrainer.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          console.error('Image preview error:', e);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <input
                  type="text"
                  value={editingTrainer.specialty}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, specialty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  placeholder="e.g., Strength Training"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={editingTrainer.bio || ''}
                  onChange={(e) => setEditingTrainer({ ...editingTrainer, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={editingTrainer.instagramUrl || ''}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, instagramUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={editingTrainer.facebookUrl || ''}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, facebookUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={editingTrainer.twitterUrl || ''}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, twitterUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={editingTrainer.linkedinUrl || ''}
                    onChange={(e) => setEditingTrainer({ ...editingTrainer, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveTrainer}
                className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingTrainer(null);
                }}
                className="flex-1 bg-gray-200 text-black px-6 py-3 font-bold uppercase hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Content Items */}
      {isEditing && editingItem && activeTab !== 'pricing' && activeTab !== 'footer' && activeTab !== 'collaborations' && activeTab !== 'trainers' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold uppercase mb-6">
              {editingItem.id && getCurrentItems().find(i => i.id === editingItem.id) ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://... or upload image"
                  />
                  <label className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap">
                    {uploading && uploadField === 'image' ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'image');
                        // Reset input so same file can be selected again
                        e.target.value = '';
                      }}
                      disabled={uploading}
                    />
                  </label>
                </div>
                {editingItem.image && (
                  <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden max-w-md">
                    <div className="relative aspect-video bg-gray-100">
                      <Image
                        src={editingItem.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          console.error('Image preview error:', e);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {activeTab === 'shop' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="text"
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="e.g., $29.99"
                  />
                </div>
              )}

              {(activeTab === 'events' || activeTab === 'classes' || activeTab === 'amenities') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    rows={3}
                  />
                </div>
              )}

              {activeTab === 'classes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Header Image URL (for detail page)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.headerImage || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, headerImage: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                        placeholder="https://... (optional, uses main image if not provided)"
                      />
                      <label className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap">
                        {uploading && uploadField === 'headerImage' ? 'Uploading...' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'headerImage');
                            // Reset input so same file can be selected again
                            e.target.value = '';
                          }}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    {editingItem.headerImage && (
                      <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden max-w-md">
                        <div className="relative aspect-video bg-gray-100">
                          <Image
                            src={editingItem.headerImage}
                            alt="Header Preview"
                            fill
                            className="object-cover"
                            onError={(e) => {
                              console.error('Image preview error:', e);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Trainer</label>
                    <input
                      type="text"
                      value={editingItem.trainer || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, trainer: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      placeholder="e.g., John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Benefits (one per line)</label>
                    <textarea
                      value={(editingItem.benefits || []).join('\n')}
                      onChange={(e) => {
                        const benefits = e.target.value.split('\n').filter(b => b.trim());
                        setEditingItem({ ...editingItem, benefits });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      rows={4}
                      placeholder="Improved strength&#10;Better flexibility&#10;Increased endurance"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter each benefit on a new line</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Schedule (one per line)</label>
                    <textarea
                      value={(editingItem.schedule || []).join('\n')}
                      onChange={(e) => {
                        const schedule = e.target.value.split('\n').filter(s => s.trim());
                        setEditingItem({ ...editingItem, schedule });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                      rows={4}
                      placeholder="Monday: 6:00 AM - 7:00 AM&#10;Wednesday: 6:00 AM - 7:00 AM&#10;Friday: 6:00 AM - 7:00 AM"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter each schedule item on a new line</p>
                  </div>
                </>
              )}

              {activeTab === 'events' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                }}
                className="flex-1 bg-gray-200 text-black px-6 py-3 font-bold uppercase hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Pricing Plans */}
      {isEditing && editingPlan && activeTab === 'pricing' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold uppercase mb-6">
              {editingPlan.id && pricingPlans.find(p => p.id === editingPlan.id) ? 'Edit' : 'Add'} Pricing Plan
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Plan Name</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="text"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="$49"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Period</label>
                  <input
                    type="text"
                    value={editingPlan.period}
                    onChange={(e) => setEditingPlan({ ...editingPlan, period: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="per month"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Features</label>
                  <button
                    type="button"
                    onClick={addFeatureToPlan}
                    className="text-sm text-black font-semibold hover:underline"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {editingPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updatePlanFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                        placeholder="Feature description"
                      />
                      <button
                        type="button"
                        onClick={() => removePlanFeature(index)}
                        className="bg-red-600 text-white px-4 py-2 font-bold text-sm uppercase hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.popular || false}
                    onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Mark as "Most Popular"</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSavePlan}
                className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingPlan(null);
                }}
                className="flex-1 bg-gray-200 text-black px-6 py-3 font-bold uppercase hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for Footer */}
      {editingFooter && footerData && activeTab === 'footer' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold uppercase mb-6">Edit Footer Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gym Name</label>
                <input
                  type="text"
                  value={footerData.gymName}
                  onChange={(e) => setFooterData({ ...footerData, gymName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={footerData.address}
                  onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City, State, ZIP</label>
                <input
                  type="text"
                  value={footerData.city}
                  onChange={(e) => setFooterData({ ...footerData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="text"
                    value={footerData.phone}
                    onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={footerData.email}
                    onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weekday Hours</label>
                  <input
                    type="text"
                    value={footerData.hoursWeekday}
                    onChange={(e) => setFooterData({ ...footerData, hoursWeekday: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="06 AM - 10 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Saturday Hours</label>
                  <input
                    type="text"
                    value={footerData.hoursSaturday}
                    onChange={(e) => setFooterData({ ...footerData, hoursSaturday: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="08 AM - 8 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sunday Hours</label>
                  <input
                    type="text"
                    value={footerData.hoursSunday}
                    onChange={(e) => setFooterData({ ...footerData, hoursSunday: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="09 AM - 6 PM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={footerData.instagramUrl}
                    onChange={(e) => setFooterData({ ...footerData, instagramUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={footerData.facebookUrl}
                    onChange={(e) => setFooterData({ ...footerData, facebookUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube URL</label>
                  <input
                    type="url"
                    value={footerData.youtubeUrl}
                    onChange={(e) => setFooterData({ ...footerData, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">TikTok URL</label>
                  <input
                    type="url"
                    value={footerData.tiktokUrl}
                    onChange={(e) => setFooterData({ ...footerData, tiktokUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="https://tiktok.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={footerData.copyright}
                  onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveFooter}
                className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setEditingFooter(false)}
                className="flex-1 bg-gray-200 text-black px-6 py-3 font-bold uppercase hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
