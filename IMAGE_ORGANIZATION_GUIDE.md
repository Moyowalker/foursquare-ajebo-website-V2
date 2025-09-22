# Google Drive Image Organization Guide

## Folder Structure Created

The following folder structure has been created in your project to organize your Google Drive images:

```
public/images/facilities/
├── accommodation/
│   ├── international-guest-house/
│   ├── diamond-estate/
│   ├── gabriel-farombi-building/
│   ├── jonathan-odega-house/
│   ├── odunaike-house/
│   ├── jehovah-shammah-house/
│   └── ruby-estate/
├── conference/
│   └── auditorium/
├── recreation/
│   ├── sports-centre/
│   └── gym/
├── dining/
│   └── delish-fingers/
└── infrastructure/
    ├── main-gate/
    └── mast/
```

## How to Add Your Images

### Step 1: Download from Google Drive
1. Download each facility folder from your Google Drive
2. Extract the images from each folder

### Step 2: Place Images in Correct Folders
Place your downloaded images into the corresponding folders created above:

- **International Guest House** → `public/images/facilities/accommodation/international-guest-house/`
- **Diamond Estate** → `public/images/facilities/accommodation/diamond-estate/`
- **Gabriel Farombi Building** → `public/images/facilities/accommodation/gabriel-farombi-building/`
- **Jonathan Odega House** → `public/images/facilities/accommodation/jonathan-odega-house/`
- **Odunaike House** → `public/images/facilities/accommodation/odunaike-house/`
- **Jehovah Shammah House** → `public/images/facilities/accommodation/jehovah-shammah-house/`
- **Ruby Estate** → `public/images/facilities/accommodation/ruby-estate/`
- **Auditorium** → `public/images/facilities/conference/auditorium/`
- **Sports Centre** → `public/images/facilities/recreation/sports-centre/`
- **Gym** → `public/images/facilities/recreation/gym/`
- **Delish Fingers** → `public/images/facilities/dining/delish-fingers/`
- **Main Gate** → `public/images/facilities/infrastructure/main-gate/`
- **Mast** → `public/images/facilities/infrastructure/mast/`

### Step 3: Update Image Configuration
After placing your images, update the `src/lib/image-config.ts` file to add the actual image paths. For example:

```typescript
{
  id: 'international-guest-house',
  name: 'International Guest House',
  // ... other properties
  images: [
    { 
      src: '/images/facilities/accommodation/international-guest-house/exterior.jpg', 
      alt: 'International Guest House Exterior',
      caption: 'Beautiful exterior view of our premium guest house'
    },
    { 
      src: '/images/facilities/accommodation/international-guest-house/interior.jpg', 
      alt: 'International Guest House Interior',
      caption: 'Comfortable and modern interior spaces'
    }
    // Add more images as needed
  ]
}
```

## Image Naming Recommendations

For consistency, consider using descriptive names for your images:
- `exterior.jpg` - Outside view of the building
- `interior.jpg` - Inside view/lobby area
- `rooms.jpg` - Room/accommodation spaces
- `facilities.jpg` - Special facilities or amenities
- `dining.jpg` - Dining areas (for accommodation)
- `recreation.jpg` - Recreational spaces

## File Format Support

The website supports all common image formats:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

## Next Steps

1. Download and organize your images as described above
2. Update the image configuration file with actual image paths
3. Test the website to ensure images display correctly
4. The website will automatically show image galleries for each facility

## Features Available

Once images are added:
- ✅ Automatic image galleries for each facility
- ✅ Lightbox viewing with navigation
- ✅ Responsive image display
- ✅ Image captions and descriptions
- ✅ Category-based facility organization
- ✅ Professional facility showcase pages

Your facility pages are now ready to showcase your beautiful Google Drive images!