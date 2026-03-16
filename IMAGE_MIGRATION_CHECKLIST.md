# Website Image Migration Checklist

This checklist maps the image paths already referenced in code but currently missing in `public/images`.

## How to Use

1. Download curated images from Google Drive.
2. Rename each file to match the target filename exactly (case-sensitive on deploy platforms).
3. Place files under `public/images/...` following the paths below.
4. Run `npm run images:audit` to verify there are no missing image files.

## Current Missing Paths (58)

### Authors (3)
- `/images/authors/deacon-michael.jpg`
- `/images/authors/pastor-emmanuel.jpg`
- `/images/authors/pastor-grace.jpg`

### Blog (23)
- `/images/blog/21-days-prayer-2025.jpg`
- `/images/blog/21-days-prayer-og.jpg`
- `/images/blog/compassion-hands-1.jpg`
- `/images/blog/compassion-hands-2.jpg`
- `/images/blog/compassion-hands-launch.jpg`
- `/images/blog/compassion-hands-og.jpg`
- `/images/blog/family-retreat-1.jpg`
- `/images/blog/family-retreat-2.jpg`
- `/images/blog/family-retreat-2025-og.jpg`
- `/images/blog/family-retreat-2025.jpg`
- `/images/blog/family-retreat-3.jpg`
- `/images/blog/family-retreat-4.jpg`
- `/images/blog/healing-testimony-1.jpg`
- `/images/blog/healing-testimony-og.jpg`
- `/images/blog/healing-testimony.jpg`
- `/images/blog/placeholder.jpg`
- `/images/blog/prayer-fasting-1.jpg`
- `/images/blog/prayer-fasting-2.jpg`
- `/images/blog/summer-camp-2025-1.jpg`
- `/images/blog/summer-camp-2025-2.jpg`
- `/images/blog/summer-camp-2025-3.jpg`
- `/images/blog/summer-camp-2025-og.jpg`
- `/images/blog/summer-camp-2025.jpg`

### Events (21)
- `/images/events/bible-study.jpg`
- `/images/events/community-1.jpg`
- `/images/events/family-1.jpg`
- `/images/events/family-2.jpg`
- `/images/events/family-retreat.jpg`
- `/images/events/leadership-1.jpg`
- `/images/events/leadership-2.jpg`
- `/images/events/leadership-3.jpg`
- `/images/events/leadership-conference.jpg`
- `/images/events/outreach-1.jpg`
- `/images/events/outreach-day.jpg`
- `/images/events/placeholder.jpg`
- `/images/events/prayer-1.jpg`
- `/images/events/prayer-night.jpg`
- `/images/events/study-1.jpg`
- `/images/events/study-2.jpg`
- `/images/events/worship-1.jpg`
- `/images/events/youth-camp-1.jpg`
- `/images/events/youth-camp-2.jpg`
- `/images/events/youth-camp-2025.jpg`
- `/images/events/youth-camp-3.jpg`

### Facilities (4)
- `/images/facilities/board-room.jpg`
- `/images/facilities/fellowship-hall.jpg`
- `/images/facilities/main-auditorium.jpg`
- `/images/facilities/training-rooms.jpg`

### Gallery (1)
- `/images/gallery/placeholder.jpg`

### Root-Level Paths (6)
- `/images/building-expansion.jpg`
- `/images/church-service.jpg`
- `/images/missions-campaign.jpg`
- `/images/og-image.jpg`
- `/images/placeholder.svg`
- `/images/youth-camp.jpg`

## Notes

- Existing files in `public/images/board` and `public/images/leadership/executives` are already wired and available.
- Unused image files currently detected: `/images/board/pastor-grace.jpg`, `/images/church-logo.svg`, `/images/facilities/real/jehovah-shammah-house.jpg`.
