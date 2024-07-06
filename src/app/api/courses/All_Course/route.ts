const courses: Course[] = [
  {
    id: 1,
    title: "Guitar Fundamentals",
    slug: "guitar-fundamentals",
    description:
      "Learn the basics of playing guitar with our comprehensive beginner's course.",
    price: 99.99,
    instructor: "John Doe",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/2021348/pexels-photo-2021348.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
    videoDetails: {
      totalDuration: "2 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "1.01 Introduction to Guitar",
          duration: "05:50",
          intro: "Introduction to the basics of playing guitar.",
          description:
            "Learn how to hold the guitar, basic strumming techniques, and simple chords.",
          videoUrl: "https://youtu.be/23Uw69hL2E4?si=K3-GV741l-MdJknh",
        },
        {
          title: "1.02 Basic Chords",
          duration: "03:15",
          intro: "Learn the essential chords every guitarist should know.",
          description:
            "This video covers the finger positions and transitions between basic chords.",
          videoUrl: "https://youtu.be/rTMN8rCBWkw?si=V69W60XvXKTiVPsT",
        },
        {
          title: "1.03 Simple Songs",
          duration: "06:35",
          intro: "Play your first songs on the guitar.",
          description: "Practice simple songs using the chords you've learned.",
          videoUrl: "https://youtu.be/5jca-sWgemI?si=qrYGdqV1jlSUlxKx",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Piano for Beginners",
    slug: "piano-for-beginners",
    description:
      "Start your musical journey with foundational piano skills taught by expert instructors.",
    price: 109.99,
    instructor: "Jane Smith",
    isFeatured: false,
    image:
      "https://images.pexels.com/photos/322719/pexels-photo-322719.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    videoDetails: {
      totalDuration: "3 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "2.01 Introduction to Piano",
          duration: "07:00",
          intro: "Getting started with piano basics.",
          description:
            "Learn how to sit at the piano, finger positions, and basic keys.",
          videoUrl: "https://youtu.be/827jmswqnEA?si=WMjydh8FlwZ8BSNS",
        },
        {
          title: "2.02 Basic Scales",
          duration: "08:20",
          intro: "Introduction to piano scales.",
          description: "Understand and practice major and minor scales.",
          videoUrl: "https://youtu.be/e9dM3_6IR20?si=XLWC3OknKFs9LdyS",
        },
        {
          title: "2.03 Playing Simple Melodies",
          duration: "09:45",
          intro: "Start playing simple piano melodies.",
          description: "Use scales and finger positions to play easy songs.",
          videoUrl: "https://youtu.be/zLdCdUOdTac?si=ZyE8rvAZsA6fo5X8",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Advanced Vocal Techniques",
    slug: "advanced-vocal-techniques",
    description:
      "Enhance your singing with advanced vocal techniques for intermediate to advanced learners.",
    price: 119.99,
    instructor: "Emily Johnson",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/3824763/pexels-photo-3824763.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
    videoDetails: {
      totalDuration: "2.5 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "3.01 Breath Control",
          duration: "10:00",
          intro: "Mastering breath control for singing.",
          description:
            "Techniques to improve your breath control and sustain notes longer.",
          videoUrl: "https://example.com/video7",
        },
        {
          title: "3.02 Vocal Warm-ups",
          duration: "12:30",
          intro: "Effective warm-up exercises.",
          description:
            "Learn and practice vocal warm-ups to prepare your voice.",
          videoUrl: "https://example.com/video8",
        },
        {
          title: "3.03 Advanced Techniques",
          duration: "15:00",
          intro: "Exploring advanced vocal techniques.",
          description: "Learn vibrato, trills, and other advanced techniques.",
          videoUrl: "https://example.com/video9",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Drumming Mastery",
    slug: "drumming-mastery",
    description:
      "Master the drums with our comprehensive course covering all skill levels.",
    price: 129.99,
    instructor: "Mike Brown",
    isFeatured: false,
    image:
      "https://images.pexels.com/photos/7715644/pexels-photo-7715644.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    videoDetails: {
      totalDuration: "4 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "4.01 Drumming Basics",
          duration: "08:00",
          intro: "Introduction to basic drumming techniques.",
          description:
            "Learn how to hold drumsticks, basic rhythms, and drumming posture.",
          videoUrl: "https://example.com/video10",
        },
        {
          title: "4.02 Intermediate Rhythms",
          duration: "10:00",
          intro: "Intermediate drumming patterns.",
          description: "Practice intermediate rhythms and drum fills.",
          videoUrl: "https://example.com/video11",
        },
        {
          title: "4.03 Advanced Techniques",
          duration: "12:00",
          intro: "Advanced drumming techniques.",
          description: "Learn advanced drumming techniques and soloing.",
          videoUrl: "https://example.com/video12",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Jazz Improvisation",
    slug: "jazz-improvisation",
    description:
      "Learn the art of jazz improvisation with this course designed for all levels.",
    price: 139.99,
    instructor: "Chris Davis",
    isFeatured: false,
    image:
      "https://images.pexels.com/photos/9002892/pexels-photo-9002892.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
    videoDetails: {
      totalDuration: "3 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "5.01 Basics of Jazz Improvisation",
          duration: "09:00",
          intro: "Introduction to jazz improvisation.",
          description: "Learn the basics of improvising in jazz.",
          videoUrl: "https://example.com/video13",
        },
        {
          title: "5.02 Jazz Scales",
          duration: "11:30",
          intro: "Understanding jazz scales.",
          description:
            "Learn and practice common scales used in jazz improvisation.",
          videoUrl: "https://example.com/video14",
        },
        {
          title: "5.03 Improvising Over Changes",
          duration: "13:20",
          intro: "Improvising over chord changes.",
          description:
            "Techniques for improvising over different chord progressions.",
          videoUrl: "https://example.com/video15",
        },
      ],
    },
  },
  {
    id: 6,
    title: "Music Production Fundamentals",
    slug: "music-production-fundamentals",
    description:
      "Dive into music production with this introductory course on the basics of sound engineering and mixing.",
    price: 149.99,
    instructor: "Alex Wilson",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/9005436/pexels-photo-9005436.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
    videoDetails: {
      totalDuration: "5 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "6.01 Introduction to Music Production",
          duration: "15:00",
          intro: "Getting started with music production.",
          description: "Overview of music production tools and software.",
          videoUrl: "https://example.com/video16",
        },
        {
          title: "6.02 Recording Techniques",
          duration: "18:00",
          intro: "Basic recording techniques.",
          description:
            "Learn how to record instruments and vocals effectively.",
          videoUrl: "https://example.com/video17",
        },
        {
          title: "6.03 Mixing Basics",
          duration: "20:00",
          intro: "Introduction to mixing.",
          description: "Basic principles of mixing tracks in a DAW.",
          videoUrl: "https://example.com/video18",
        },
      ],
    },
  },
  {
    id: 7,
    title: "Songwriting Essentials",
    slug: "songwriting-essentials",
    description:
      "Learn the essentials of songwriting to express your musical creativity.",
    price: 159.99,
    instructor: "Samantha Miller",
    isFeatured: false,
    image:
      "https://images.pexels.com/photos/4708882/pexels-photo-4708882.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    videoDetails: {
      totalDuration: "3.5 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "7.01 Basics of Songwriting",
          duration: "12:00",
          intro: "Introduction to songwriting basics.",
          description: "Learn the fundamental elements of songwriting.",
          videoUrl: "https://example.com/video19",
        },
        {
          title: "7.02 Writing Lyrics",
          duration: "14:30",
          intro: "Crafting lyrics for your songs.",
          description: "Techniques for writing engaging and meaningful lyrics.",
          videoUrl: "https://example.com/video20",
        },
        {
          title: "7.03 Song Structure",
          duration: "16:45",
          intro: "Understanding song structure.",
          description:
            "Learn about different song structures and how to use them.",
          videoUrl: "https://example.com/video21",
        },
      ],
    },
  },
  {
    id: 8,
    title: "Electronic Music Production",
    slug: "electronic-music-production",
    description:
      "Create compelling electronic music with our course designed for beginners to advanced users.",
    price: 169.99,
    instructor: "Luke Harris",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/6953871/pexels-photo-6953871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    isFree: true,
    videoDetails: {
      totalDuration: "4 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "8.01 Introduction to Electronic Music",
          duration: "10:00",
          intro: "Getting started with electronic music production.",
          description: "Overview of electronic music genres and tools.",
          videoUrl: "https://example.com/video22",
        },
        {
          title: "8.02 Synthesizers and Drum Machines",
          duration: "12:00",
          intro: "Understanding synthesizers and drum machines.",
          description:
            "Learn how to use synthesizers and drum machines in your productions.",
          videoUrl: "https://example.com/video23",
        },
        {
          title: "8.03 Creating Your First Track",
          duration: "14:00",
          intro: "Start creating your first electronic music track.",
          description:
            "Step-by-step guide to producing a basic electronic music track.",
          videoUrl: "https://example.com/video24",
        },
      ],
    },
  },
  {
    id: 9,
    title: "Classical Music History",
    slug: "classical-music-history",
    description:
      "Explore the rich history of classical music from its origins to the present day.",
    price: 179.99,
    instructor: "Grace Lee",
    isFeatured: false,
    image:
      "https://images.pexels.com/photos/4127953/pexels-photo-4127953.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    videoDetails: {
      totalDuration: "6 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "9.01 Early Music Period",
          duration: "20:00",
          intro: "Exploring the early period of classical music.",
          description:
            "An overview of the music and composers of the early classical period.",
          videoUrl: "https://example.com/video25",
        },
        {
          title: "9.02 Baroque Period",
          duration: "22:00",
          intro: "Deep dive into the Baroque period.",
          description:
            "Learn about the key composers and music styles of the Baroque period.",
          videoUrl: "https://example.com/video26",
        },
        {
          title: "9.03 Classical Period",
          duration: "24:00",
          intro: "Understanding the classical period of music.",
          description:
            "Explore the music and composers that defined the classical period.",
          videoUrl: "https://example.com/video27",
        },
      ],
    },
  },
  {
    id: 10,
    title: "Blues Guitar Techniques",
    slug: "blues-guitar-techniques",
    description:
      "Discover the techniques of blues guitar to add soul and depth to your playing.",
    price: 189.99,
    instructor: "Ethan Moore",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/5288861/pexels-photo-5288861.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
    videoDetails: {
      totalDuration: "2.5 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "10.01 Introduction to Blues Guitar",
          duration: "08:00",
          intro: "Getting started with blues guitar.",
          description:
            "Learn the basics of blues guitar, including common chords and scales.",
          videoUrl: "https://example.com/video28",
        },
        {
          title: "10.02 Blues Licks",
          duration: "10:00",
          intro: "Mastering essential blues licks.",
          description:
            "Practice and perfect common blues licks to enhance your playing.",
          videoUrl: "https://example.com/video29",
        },
        {
          title: "10.03 Blues Solos",
          duration: "12:00",
          intro: "Creating soulful blues solos.",
          description:
            "Learn how to improvise and create your own blues solos.",
          videoUrl: "https://example.com/video30",
        },
      ],
    },
  },
  {
    id: 11,
    title: "Blues Licks Techniques",
    slug: "blues-licks-techniques",
    description:
      "Bending involves pushing or pulling a string up or down to change its pitch. This technique mimics the human voice and adds a soulful, expressive quality to the notes.",
    price: 189.99,
    instructor: "Ejhon Mogi",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/1125748/pexels-photo-1125748.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: true,
    videoDetails: {
      totalDuration: "2 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "11.01 Bending Techniques",
          duration: "07:00",
          intro: "Introduction to string bending.",
          description:
            "Learn how to bend strings to add expression to your playing.",
          videoUrl: "https://example.com/video31",
        },
        {
          title: "11.02 Vibrato Techniques",
          duration: "09:00",
          intro: "Mastering vibrato on guitar.",
          description:
            "Practice vibrato techniques to enhance your guitar solos.",
          videoUrl: "https://example.com/video32",
        },
        {
          title: "11.03 Combining Bending and Vibrato",
          duration: "11:00",
          intro: "Combining bending and vibrato for expressive playing.",
          description:
            "Learn how to effectively combine bending and vibrato in your solos.",
          videoUrl: "https://example.com/video33",
        },
      ],
    },
  },
  {
    id: 12,
    title: "Blues Licks Mastery",
    slug: "blues-licks-techniques",
    description:
      "When a string is bent, its pitch changes, mimicking the inflections of the human voice and adding a richly expressive quality to the sound.",
    price: 200.99,
    instructor: "Ejhon Mogi",
    isFeatured: true,
    image:
      "https://images.pexels.com/photos/4471308/pexels-photo-4471308.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFree: false,
    videoDetails: {
      totalDuration: "2.5 Hours",
      accessPeriod: "90 Days",
      videos: [
        {
          title: "12.01 Advanced Bending Techniques",
          duration: "09:00",
          intro: "Exploring advanced string bending.",
          description:
            "Learn advanced bending techniques for more expressive playing.",
          videoUrl: "https://example.com/video34",
        },
        {
          title: "12.02 Harmonic Bends",
          duration: "11:00",
          intro: "Mastering harmonic bends.",
          description:
            "Combine bending with harmonics for unique sound effects.",
          videoUrl: "https://example.com/video35",
        },
        {
          title: "12.03 Integrating Bends into Solos",
          duration: "13:00",
          intro: "Using bends effectively in solos.",
          description:
            "Learn how to integrate bending techniques seamlessly into your solos.",
          videoUrl: "https://example.com/video36",
        },
      ],
    },
  },
];

import Course from "@/models/course.models";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

connect();

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  instructor: string;
  isFeatured: boolean;
  image: string;
  isFree: boolean;
  videoDetails: {
    totalDuration: string;
    accessPeriod: string;
    videos: {
      title: string;
      duration: string;
      intro: string;
      description: string;
      videoUrl: string;
    }[];
  };
}

// Define the custom type for the JWT payload
interface TokenPayload extends JwtPayload {
  id: string;
}

export async function GET(req: Request) {
  await connect();

  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    let user = null;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.TOKEN_SECRET!
        ) as TokenPayload;
        user = await User.findById(decoded.id);
      } catch (error) {
        return NextResponse.json(
          { success: false, error: "Invalid token" },
          { status: 401 }
        );
      }
    }

    if (courseId) {
      const course = courses.find(
        (course) => course.id.toString() === courseId
      );

      if (!course) {
        return NextResponse.json(
          { success: false, error: "Course not found" },
          { status: 404 }
        );
      }

      if (!course.isFree && !user) {
        return NextResponse.json(
          { success: false, error: "Authentication required for paid courses" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: true, data: [course] },
        { status: 200 }
      );
    } else {
      const publicCourses = courses.map((course) => {
        if (!course.isFree && !user) {
          return { ...course, videoDetails: null };
        }
        return course;
      });

      return NextResponse.json(
        { success: true, data: publicCourses },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
