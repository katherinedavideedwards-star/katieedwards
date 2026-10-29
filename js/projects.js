/*
  PROJECT DATA — edit this file to change what shows on the site.

  Media: drop your files into the folder named in each `src`, using exactly
  that filename. Anything missing shows as a labelled placeholder.
  To use a different filename (.png, .mov…), change `src`.
  Image carousels: write each slide's caption in `caption`; add `link` for a "Watch on Instagram" link under it.

  size:  "xl" = big tile (2 rows), "" = regular tile
  keyStats / skills: tags shown across the top of the project card
  preview: short silent clip that loops on the card (cover is its still image)
  framed: true shows the cover whole on a black background, like the video previews
  tint:  sage | blush | butter | sky | lilac
  media.display: "grid" (videos side by side) or "carousel" (swipe through, with captions)
  media.wide: true for wide carousel images (one full-width slide at a time)
  media.landscape: true for a gallery of 16:9 videos; item.landscape: true for one 16:9 video in a mixed gallery
*/

window.ROLES = [
  {
    org: "UBC Development & Alumni Engagement",
    role: "Digital Content Creator",
    dates: "August – December 2025",
    summary: "Produced and optimised video content for UBC Development & Alumni Engagement, generating 1.9M+ impressions and 1.1M+ views. The videos drove 86K+ engagements and 25K+ clicks to key landing pages.",
    layout: "bento",
    projects: [
      {
        id: "forestry",
        size: "xl",
        tint: "sage",
        kicker: "Campaign Spotlight",
        title: "More than a Forest: A Living Laboratory",
        subtitle: "Malcolm Knapp Research Forest",
        blurb: "A two-step paid social fundraising campaign. Seeding videos told the forest's story; appeal ads then asked for a donation.",
        badge: "Bronze · CCAE 2026",
        keyStats: ["1.67M+ impressions", "960K+ views"],
        skills: ["Video editing", "Paid social"],
        stat: { value: "1.67M+", label: "impressions" },
        preview: "assets/projects/forestry/preview.mp4",
        cover: "assets/projects/forestry/preview.jpg",
        intro:
          "A paid social fundraising campaign in two steps. First, “seeding” videos introduced the forest's story. Then “appeal” ads asked people who had already seen it to donate.",
        goal: "Build interest in the research forest before asking people to donate.",
        sections: [
          {
            h: "My role",
            list: [
              "Turned four minutes of interview footage into four 30-second seeding videos and the appeal edits for Instagram and Facebook",
              "Chose the most powerful lines, added music and captions",
              "Reviewed every cut frame by frame and took each version through rounds of manager approval"
            ]
          }
        ],
        numbers: [
          ["1.67M+", "impressions"],
          ["960,000+", "video views"],
          ["16,300+", "clicks"],
          ["200,000+", "views on each version"]
        ],
        compare: {
          title: "Click-through rate",
          rows: [["Seeding ads", 0.9], ["Appeal ads", 1.3]],
          unit: "%"
        },
        recognition: "Bronze, CCAE 2026 Prix d'Excellence · Best Use of Video/Film: Engagement",
        learned:
          "Appeal ads had a higher click-through rate than seeding ads (1.3% vs 0.9%), which suggests warming audiences up first made them more likely to act.",
        tools: ["Premiere Pro", "Copyright-free music"],
        media: {
          display: "grid",
          items: [
            { type: "video", src: "assets/projects/forestry/video-1.mp4", poster: "assets/projects/forestry/poster-1.jpg", label: "Appeal video 1: Dr. Roeser" },
            { type: "video", src: "assets/projects/forestry/video-2.mp4", poster: "assets/projects/forestry/poster-2.jpg", label: "Appeal video 2: Rain Pierre" },
            { type: "video", src: "assets/projects/forestry/video-3.mp4", poster: "assets/projects/forestry/poster-3.jpg", label: "Appeal video 3: Bruce Blackwell" },
            { type: "video", src: "assets/projects/forestry/video-4.mp4", poster: "assets/projects/forestry/poster-4.jpg", label: "Appeal video 4: Hélène Marcoux" }
          ]
        },
        links: [
          ["Read the impact story", "https://give.ubc.ca/impact-stories/malcolm-knapp-research-forest/"],
          ["CCAE Prix d'Excellence", "https://ccaecanada.org/prix-dexcellence/"]
        ]
      },

      {
        id: "maggie",
        tint: "blush",
        kicker: "Impact Story",
        title: "Maggie Chan",
        blurb: "Two 30-second vertical videos and a horizontal impact story video showing donors what a scholarship changes for one student.",
        keyStats: ["85K+ impressions", "42.7K views"],
        skills: ["Storyboarding", "Directing", "Editing"],
        stat: { value: "42.7K", label: "video views" },
        preview: "assets/projects/maggie-chan/preview.mp4",
        cover: "assets/projects/maggie-chan/preview.jpg",
        goal: "Show donors what a scholarship changes for one student.",
        sections: [
          {
            h: "My role",
            list: [
              "Storyboarded the shoot and directed Maggie through b-roll on campus",
              "Ran the on-camera interview",
              "Pulled voiceover from an earlier interview and edited the two 30-second vertical videos and the horizontal impact story video",
              "Took the edits through manager review and final sign-off from the team lead"
            ]
          }
        ],
        numbers: [
          ["85,270", "impressions (Meta + Google)"],
          ["42,751", "video views"],
          ["1,588", "clicks"]
        ],
        tools: ["Premiere Pro", "Adobe Audition", "DJI Osmo Pocket 3"],
        media: {
          display: "grid",
          items: [
            { type: "video", src: "assets/projects/maggie-chan/video-3.mp4", poster: "assets/projects/maggie-chan/video-3-poster.jpg", label: "Horizontal impact story video", landscape: true },
            { type: "video", src: "assets/projects/maggie-chan/video-1.mp4", poster: "assets/projects/maggie-chan/poster-1.jpg", label: "Vertical video 1" },
            { type: "video", src: "assets/projects/maggie-chan/video-2.mp4", poster: "assets/projects/maggie-chan/poster-2.jpg", label: "Vertical video 2" }
          ]
        },
        links: [["Read Maggie's story", "https://give.ubc.ca/impact-stories/maggie-chan/"]]
      },

      {
        id: "events",
        tint: "butter",
        kicker: "Event & Donor Films",
        title: "Robert H. Lee Alumni Centre: 10-Year Anniversary",
        blurb: "A recap of the anniversary celebration, plus personal thank-you videos for donors.",
        keyStats: ["2 films", "Sole filmer"],
        skills: ["Event filming", "Editing", "Donor relations"],
        stat: { value: "10", label: "years celebrated" },
        preview: "assets/projects/event-films/preview.mp4",
        cover: "assets/projects/event-films/preview.jpg",
        goal: "Thank donors and guests with a keepsake of the night.",
        sections: [
          {
            h: "Robert H. Lee Alumni Centre: 10-year anniversary",
            p: "A recap of the September 2025 anniversary celebration, sent directly to the building's donors and event guests.",
            list: [
              "Planned the shot list ahead of time based on the team's priority guests",
              "Worked as the only filmer at the live event",
              "Edited the full video, including music, captions and audio",
              "Revised it through review rounds with my manager and the partner office that requested it"
            ]
          },
          {
            h: "Donor thank-you videos",
            list: [
              "Filmed and edited personal thank-you, birthday and milestone videos for donors to UBC Forestry and science research",
              "Scheduled shoots across campus and worked with staff who knew each donor to get the message right"
            ]
          }
        ],
        tools: ["Premiere Pro", "Adobe Audition", "DJI Osmo Pocket 3"],
        media: {
          display: "grid",
          landscape: true,
          items: [
            { type: "video", src: "assets/projects/event-films/anniversary.mp4", poster: "assets/projects/event-films/anniversary-poster.jpg", label: "10-year anniversary recap" },
            { type: "video", src: "assets/projects/event-films/thank-you.mp4", poster: "assets/projects/event-films/thank-you-poster.jpg", label: "Donor thank-you video" }
          ]
        }
      }
    ]
  },

  {
    org: "Newmont Corporation",
    role: "External Relations & Communications Intern",
    dates: "May 2024 – Jan 2025",
    layout: "single",
    projects: [
      {
        id: "newmont",
        tint: "sky",
        kicker: "Corporate Communications & Content Planning",
        title: "Keeping 9+ sites informed and connected",
        blurb: "Facebook carousels, digital signage and a four-month content calendar for screens across North America.",
        keyStats: ["9+ sites", "4-month content calendar"],
        skills: ["Canva design", "Content planning"],
        stat: { value: "9+", label: "sites across North America" },
        cover: "assets/projects/newmont/design-1.jpg",
        coverPosition: "left center",
        goal: "Keep 9+ sites informed and connected with consistent, on-brand content.",
        sections: [
          {
            h: "Corporate communications",
            list: [
              "Designed Facebook carousels for International Day of Women in Mining, National Indigenous Peoples Day, Pride Month and National Disability Independence Day",
              "Created digital signage, banners, posters, infographics and branded templates in Canva, keeping every piece on brand",
              "Worked with HR, legal and communications teams to review content for accuracy before it went live"
            ]
          },
          {
            h: "Content planning",
            list: [
              "Built a four-month content calendar for screens across 9+ sites in North America",
              "Set a regular rhythm: leadership messages every other Monday, safety updates every Thursday, business updates monthly, an employee spotlight each month, and 13 days of significance",
              "Planned B2B communications alongside it through Viva Engage, email and LinkedIn",
              "Tracked engagement in Meta Business Suite and Poppulo to choose the best posting times"
            ]
          }
        ],
        numbers: [
          ["9+", "sites reached"],
          ["4-month", "content calendar"],
          ["13", "days of significance"]
        ],
        tools: ["Canva", "Meta Business Suite", "Poppulo", "Viva Engage"],
        media: {
          display: "carousel",
          wide: true,
          items: [
            { type: "image", src: "assets/projects/newmont/design-1.jpg", label: "Women in Mining carousel", caption: "Facebook carousel: International Day of Women in Mining (June 15, 2024)" },
            { type: "image", src: "assets/projects/newmont/design-2.jpg", label: "Disability Independence Day carousel", caption: "Facebook carousel: National Disability Independence Day (July 26, 2024)" },
            { type: "image", src: "assets/projects/newmont/design-3.jpg", label: "Indigenous Peoples Day carousel", caption: "Facebook carousel: National Indigenous Peoples Day (June 21, 2024)" },
            { type: "image", src: "assets/projects/newmont/design-4.jpg", label: "Pride Month carousel", caption: "Facebook carousel: Pride Month (June 2024)" }
          ]
        }
      }
    ]
  },

  {
    org: "UBC Centre for Community Engaged Learning",
    role: "Social Impact Program Assistant",
    dates: "May 2023 – 2024",
    extraRoles: [["Student Engagement Coordinator, Communications", "November 2023 – April 2024"]],
    layout: "single",
    projects: [
      {
        id: "ccel",
        tint: "lilac",
        kicker: "Social Media & Events",
        title: "Getting students to show up for social issues",
        blurb: "Trend-led reels, the “CCEL Chats” series, the first CCEL podcast and event posters.",
        keyStats: ["20%+ social growth", "5K+ reel views"],
        skills: ["Short-form video", "Event promotion"],
        stat: { value: "20%+", label: "social growth in one year" },
        framed: true,
        cover: "assets/projects/ccel/image-3.jpg",
        goal: "Get students engaged with social issues and showing up to events.",
        sections: [
          {
            h: "My role",
            list: [
              "Introduced trend formats on Instagram and TikTok, like street interviews, behind-the-scenes reels and the “CCEL Chats” series",
              "Started the first UBC CCEL Podcast",
              "Designed event posters in Canva",
              "Planned and promoted events with UBC and Vancouver partners, drawing 40–100+ students each"
            ]
          }
        ],
        numbers: [
          ["20%+", "social following growth in one year"],
          ["5,000+", "views on top reels"],
          ["40–100+", "students per event"]
        ],
        tools: ["Canva", "Instagram", "TikTok"],
        media: {
          display: "carousel",
          items: [
            { type: "image", src: "assets/projects/ccel/image-1.jpg", label: "Housing justice poster", caption: "Event poster: Your Roof, Your Rights: Working Towards Housing Justice for Students (March 2024)" },
            { type: "image", src: "assets/projects/ccel/image-2.jpg", label: "Invisible Violence poster", caption: "Event poster: Invisible Violence: Identifying and Overcoming Emotional Abuse (February 2024)" },
            { type: "image", src: "assets/projects/ccel/image-3.jpg", label: "CCEL Chats reel", link: "https://www.instagram.com/reel/C40_6JUhDmJ/?utm_source=ig_web_button_share_sheet&dlrf=MzRlODBiNWFlZA==", caption: "“CCEL Chats” #1: Student Housing · 5,486 views" },
            { type: "image", src: "assets/projects/ccel/image-4.jpg", label: "Bakerview reel", link: "https://www.instagram.com/reel/Cucmum3Mc7L/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==", caption: "Behind the scenes of Bakerview: A Place for You · 4,469 views" },
            { type: "image", src: "assets/projects/ccel/image-5.jpg", label: "Street interview reel", link: "https://www.instagram.com/reel/CvjJZqqNJru/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==", caption: "Street interview: Are You Smarter Than a 5th Grader? · 1,468 views" }
          ]
        },
        links: [
          ["Another CCEL reel", "https://www.instagram.com/reel/CvyAp5ftXjV/"]
        ]
      }
    ]
  }
];

/* Film carousel: 7 photos (add film-8.jpg and an 8 here to add another). Add a `caption` to any photo if you like. */
window.FILM = [1, 2, 3, 4, 5, 6, 7].map(n => ({
  type: "image",
  src: `assets/film/film-${n}.jpg`,
  label: `Film photo ${n}`,
  alt: `35mm film photograph ${n} by Katie Edwards`,
  caption: ""
}));
