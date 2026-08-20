// Facebook 2007-2011 Client Database Service with Persistence & Seed Data

const DB_KEY = 'FB_2007_2011_DATABASE_V10';

const INITIAL_SEED_USERS = [
  {
    id: 'user_meera_sen',
    name: 'Meera Sen',
    firstName: 'Meera',
    lastName: 'Sen',
    email: 'meera.sen@facebook.com',
    avatar: '/assets/imgs/meera_profile_pic.jpg',
    status: 'is taking a quick lunch break on the campus balcony.',
    age: 31,
    work: 'High School Teacher',
    phone: '+91 987654321',
    relationship: 'Single',
    education: 'Delhi University (B.Ed & M.A. Literature)',
    bio: 'Passionate educator, literary enthusiast, and student mentor.',
    interests: 'Literature, Teaching, School Field Trips, Indian Art & History',
    photos: [
      { url: '/assets/imgs/meera_profile_pic.jpg', caption: 'Profile Photo' },
      { url: '/assets/imgs/feed_manit_bhopal.jpg', caption: 'MANIT Bhopal Campus' },
      { url: '/assets/imgs/meera_1.jpg', caption: 'Family' },
      { url: '/assets/imgs/meera_2.jpg', caption: 'Classes Started' },
      { url: '/assets/imgs/meera_3.jpg', caption: 'My School' },
      { url: '/assets/imgs/meera_4.jpg', caption: 'Lunch Break' },
      { url: '/assets/imgs/meera_5.jpg', caption: 'Portrait' }
    ],
    friends: ['user_zuck', 'user_akshima', 'user_eduardo'],
    pendingRequests: []
  },
  {
    id: 'user_meera_sen_2',
    name: 'Meera Sen',
    firstName: 'Meera',
    lastName: 'Sen',
    email: 'meera.architect@facebook.com',
    avatar: '/assets/imgs/1.jpg',
    status: 'is working on urban restoration projects.',
    age: 29,
    work: 'Senior Architect at Urban Studio',
    phone: '+91 981234567',
    relationship: 'Single',
    education: 'Jadavpur University',
    bio: 'Designing sustainable urban living spaces.',
    interests: 'Architecture, Heritage Buildings, Sketching',
    photos: [
      { url: '/assets/imgs/feed_park_benches.jpg', caption: 'Botanical Garden Park' },
      { url: '/assets/imgs/1.jpg', caption: 'Architectural Sketch' }
    ],
    friends: ['user_meera_sen'],
    pendingRequests: []
  },
  {
    id: 'user_meera_sen_3',
    name: 'Meera Sen',
    firstName: 'Meera',
    lastName: 'Sen',
    email: 'meera.bio@facebook.com',
    avatar: '/assets/imgs/2.jpg',
    status: 'is in the lab analyzing molecular biology research.',
    age: 34,
    work: 'Medical Research Scholar',
    phone: '+91 976543210',
    relationship: 'Single',
    education: 'IIT Bombay',
    bio: 'Biomedical researcher exploring health innovations.',
    interests: 'Genomics, Molecular Biology, Classical Music',
    photos: [
      { url: '/assets/imgs/2.jpg', caption: 'Lab Setup' }
    ],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_meera_kapoor',
    name: 'Meera Kapoor',
    firstName: 'Meera',
    lastName: 'Kapoor',
    email: 'meera.kapoor@facebook.com',
    avatar: '/assets/imgs/3.jpg',
    status: 'is launching her new autumn fashion line!',
    age: 28,
    work: 'Fashion Designer & Stylist',
    phone: '+91 989898989',
    relationship: 'Single',
    education: 'NIFT',
    bio: 'Creating sustainable fusion ethnic wear.',
    interests: 'Fashion, Textiles, Travel Photography',
    photos: [
      { url: '/assets/imgs/3.jpg', caption: 'Design Studio' }
    ],
    friends: ['user_akshima'],
    pendingRequests: []
  },
  {
    id: 'user_meera_roy',
    name: 'Meera Roy',
    firstName: 'Meera',
    lastName: 'Roy',
    email: 'meera.roy@facebook.com',
    avatar: '/assets/imgs/4.jpg',
    status: 'is deploying scalable backend microservices.',
    age: 32,
    work: 'Software Architect at Tech Global',
    phone: '+91 912345678',
    relationship: 'Single',
    education: 'IISc',
    bio: 'Passionate about cloud architecture and open source.',
    interests: 'Distributed Systems, Python, Trekking',
    photos: [
      { url: '/assets/imgs/4.jpg', caption: 'Tech Conference' }
    ],
    friends: ['user_dustin'],
    pendingRequests: []
  },
  {
    id: 'user_meera_deshmukh',
    name: 'Meera Deshmukh',
    firstName: 'Meera',
    lastName: 'Deshmukh',
    email: 'meera.d@facebook.com',
    avatar: '/assets/imgs/5.jpg',
    status: 'is editing her latest investigative article.',
    age: 35,
    work: 'Senior Journalist & Columnist',
    phone: '+91 923456789',
    relationship: 'Single',
    education: 'University Department of Journalism',
    bio: 'Reporting on socio-economic developments and education.',
    interests: 'Journalism, Books, Social Policy',
    photos: [
      { url: '/assets/imgs/5.jpg', caption: 'Press Room' }
    ],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_meera_sharma',
    name: 'Meera Sharma',
    firstName: 'Meera',
    lastName: 'Sharma',
    email: 'meera.sharma@facebook.com',
    avatar: '/assets/imgs/wall.jpg',
    status: 'is preparing for the national dance festival.',
    age: 27,
    work: 'Kathak Dancer & Choreographer',
    phone: '+91 934567890',
    relationship: 'Single',
    education: 'Arts Academy',
    bio: 'Promoting traditional classical performing arts.',
    interests: 'Kathak, Classical Music, Cultural Heritage',
    photos: [
      { url: '/assets/imgs/feed_flute_painting.jpg', caption: 'Flute Maiden Painting' },
      { url: '/assets/imgs/wall.jpg', caption: 'Stage Performance' }
    ],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_meera_nair',
    name: 'Meera Nair',
    firstName: 'Meera',
    lastName: 'Nair',
    email: 'meera.nair@facebook.com',
    avatar: '/assets/imgs/globe.png',
    status: 'is wrapping up filming for her documentary.',
    age: 33,
    work: 'Documentary Filmmaker',
    phone: '+91 945678901',
    relationship: 'Single',
    education: 'Film Institute',
    bio: 'Telling human stories through cinematic lens.',
    interests: 'Documentary, Cinema, Environmental Causes',
    photos: [
      { url: '/assets/imgs/globe.png', caption: 'Documentary Location' }
    ],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_zuck',
    name: 'Mark Zuckerberg',
    firstName: 'Mark',
    lastName: 'Zuckerberg',
    email: 'zuck@facebook.com',
    avatar: '/assets/imgs/1.jpg',
    status: 'is building Facebook 2.0 with classic wall features!',
    age: 23,
    work: 'Founder and CEO at Facebook',
    phone: '+1 650 555 0199',
    relationship: 'In a relationship with Priscilla Chan',
    education: 'Harvard University (Computer Science & Psychology)',
    bio: "I'm trying to make the world more open and connected.",
    interests: 'Open Source, Information Flow, Artificial Intelligence, Fencing',
    photos: [
      { url: '/assets/imgs/feed_samurai_art.jpg', caption: 'Musashi Ink Sketch' },
      { url: '/assets/imgs/1.jpg', caption: 'Palo Alto Office' }
    ],
    friends: ['user_meera_sen', 'user_eduardo', 'user_sean', 'user_dustin'],
    pendingRequests: []
  },
  {
    id: 'user_eduardo',
    name: 'Eduardo Saverin',
    firstName: 'Eduardo',
    lastName: 'Saverin',
    email: 'eduardo@facebook.com',
    avatar: '/assets/imgs/2.jpg',
    status: 'is calculating investor equity splits.',
    age: 25,
    work: 'Co-founder & Business Manager',
    phone: '+1 650 555 0188',
    relationship: 'Single',
    education: 'Harvard University (Economics)',
    bio: 'Phoenix Club member, investor, and tech entrepreneur.',
    interests: 'Finance, Chess, Meteorology, Startup Investing',
    photos: [{ url: '/assets/imgs/2.jpg', caption: 'Harvard Campus' }],
    friends: ['user_meera_sen', 'user_zuck', 'user_akshima'],
    pendingRequests: []
  },
  {
    id: 'user_sean',
    name: 'Sean Parker',
    firstName: 'Sean',
    lastName: 'Parker',
    email: 'sean@facebook.com',
    avatar: '/assets/imgs/3.jpg',
    status: "says 'A million dollars isn't cool. You know what's cool? A billion dollars.'",
    age: 28,
    work: 'President at Facebook / Napster Founder',
    phone: '+1 415 555 0177',
    relationship: 'It\'s Complicated',
    education: 'Oakton High School',
    bio: 'Venture capitalist, music lover, and viral growth believer.',
    interests: 'Napster, Plaxo, Spotify, Virality, Philanthropy',
    photos: [{ url: '/assets/imgs/3.jpg', caption: 'Silicon Valley' }],
    friends: ['user_zuck'],
    pendingRequests: []
  },
  {
    id: 'user_dustin',
    name: 'Dustin Moskovitz',
    firstName: 'Dustin',
    lastName: 'Moskovitz',
    email: 'dustin@facebook.com',
    avatar: '/assets/imgs/4.jpg',
    status: 'is debugging PHP code late into the night.',
    age: 23,
    work: 'Head of Engineering at Facebook',
    phone: '+1 650 555 0166',
    relationship: 'In a relationship',
    education: 'Harvard University',
    bio: 'Building scalable infrastructure for millions of students.',
    interests: 'Server Architecture, PHP, Asana, Ultimate Frisbee',
    photos: [{ url: '/assets/imgs/4.jpg', caption: 'Server Room' }],
    friends: ['user_zuck'],
    pendingRequests: []
  },
  {
    id: 'user_akshima',
    name: 'Akshima Sharma',
    firstName: 'Akshima',
    lastName: 'Sharma',
    email: 'akshima@facebook.com',
    avatar: '/assets/imgs/5.jpg',
    status: 'is loving the classic 2007 Facebook theme style!',
    age: 26,
    work: 'UI/UX Designer',
    phone: '+91 9811122233',
    relationship: 'Single',
    education: 'Stanford University (Design)',
    bio: 'Designing nostalgic interfaces and web applications.',
    interests: 'Web Design, Pixel Art, Retro UI, Photography',
    photos: [
      { url: '/assets/imgs/feed_moonlight_lake.jpg', caption: 'Moonlight Over Water' },
      { url: '/assets/imgs/5.jpg', caption: 'Design Showcase' }
    ],
    friends: ['user_meera_sen', 'user_eduardo'],
    pendingRequests: ['user_zuck']
  }
];

const INITIAL_SEED_POSTS = [
  {
    id: 'post_manit_1',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Visiting Maulana Azad National Institute of Technology (MANIT) Bhopal today! Beautiful palm trees & campus entrance.",
    mediaUrl: '/assets/imgs/feed_manit_bhopal.jpg',
    timestamp: Date.now() - 3600000 * 0.1,
    likes: ['user_zuck', 'user_akshima', 'user_eduardo'],
    comments: [
      {
        id: 'c_m1',
        authorId: 'user_akshima',
        content: 'The campus architecture looks grand and impressive Meera!',
        timestamp: Date.now() - 3600000 * 0.05
      }
    ]
  },
  {
    id: 'post_moonlight_1',
    authorId: 'user_akshima',
    targetUserId: null,
    content: "Full moon reflection over the lake waters tonight. Nature is breathtaking! 🌕🌊",
    mediaUrl: '/assets/imgs/feed_moonlight_lake.jpg',
    timestamp: Date.now() - 3600000 * 0.3,
    likes: ['user_meera_sen', 'user_zuck', 'user_eduardo'],
    comments: [
      {
        id: 'c_ml1',
        authorId: 'user_meera_sen',
        content: 'Stunning night view Akshima! The moon glow on the water is magic.',
        timestamp: Date.now() - 3600000 * 0.2
      }
    ]
  },
  {
    id: 'post_samurai_1',
    authorId: 'user_zuck',
    targetUserId: null,
    content: "Minimalist ink sketch artwork of Musashi & the butterfly. 'Do nothing that is of no use.'",
    mediaUrl: '/assets/imgs/feed_samurai_art.jpg',
    timestamp: Date.now() - 3600000 * 0.6,
    likes: ['user_sean', 'user_meera_sen', 'user_eduardo'],
    comments: [
      {
        id: 'c_s1',
        authorId: 'user_sean',
        content: 'Powerful quote Mark. Focus on what truly matters!',
        timestamp: Date.now() - 3600000 * 0.5
      }
    ]
  },
  {
    id: 'post_park_1',
    authorId: 'user_meera_sen_2',
    targetUserId: null,
    content: "Quiet afternoon break at the botanical garden park! Love the blue bench seating & snake wall art.",
    mediaUrl: '/assets/imgs/feed_park_benches.jpg',
    timestamp: Date.now() - 3600000 * 0.9,
    likes: ['user_meera_sen', 'user_akshima'],
    comments: []
  },
  {
    id: 'post_flute_1',
    authorId: 'user_meera_sharma',
    targetUserId: null,
    content: "Exquisite wall painting of a maiden playing flute on rocks under autumn leaves.",
    mediaUrl: '/assets/imgs/feed_flute_painting.jpg',
    timestamp: Date.now() - 3600000 * 1.2,
    likes: ['user_meera_sen', 'user_akshima', 'user_eduardo'],
    comments: []
  },
  {
    id: 'post_zuck_2',
    authorId: 'user_zuck',
    targetUserId: null,
    content: "Just reached 100 million active users on Facebook! Thank you to all our users around the world for making this possible.",
    mediaUrl: '/assets/imgs/globe.png',
    timestamp: Date.now() - 3600000 * 1.5,
    likes: ['user_meera_sen', 'user_eduardo', 'user_sean', 'user_dustin', 'user_akshima'],
    comments: [
      {
        id: 'c_z3',
        authorId: 'user_meera_sen',
        content: 'Congratulations Mark! Milestone achieved! 🎉',
        timestamp: Date.now() - 3600000 * 1.4
      }
    ]
  },
  {
    id: 'post_meera_1',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Family",
    mediaUrl: '/assets/imgs/meera_1.jpg',
    timestamp: Date.now() - 3600000 * 2,
    likes: ['user_zuck', 'user_akshima', 'user_eduardo'],
    comments: [
      {
        id: 'cm_1',
        authorId: 'user_akshima',
        content: 'Such a joyful photo Meera!',
        timestamp: Date.now() - 3600000 * 1.8
      }
    ]
  },
  {
    id: 'post_eduardo_1',
    authorId: 'user_eduardo',
    targetUserId: null,
    content: "Reviewing our Q3 financial growth metrics. User registration numbers are soaring across college networks!",
    mediaUrl: '/assets/imgs/2.jpg',
    timestamp: Date.now() - 3600000 * 3,
    likes: ['user_zuck', 'user_meera_sen'],
    comments: []
  },
  {
    id: 'post_meera_2',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Classes Started",
    mediaUrl: '/assets/imgs/meera_2.jpg',
    timestamp: Date.now() - 3600000 * 4,
    likes: ['user_eduardo'],
    comments: []
  },
  {
    id: 'post_akshima_1',
    authorId: 'user_akshima',
    targetUserId: null,
    content: "Finalizing retro UI component designs for the news feed and profile walls! ✨💻",
    mediaUrl: '/assets/imgs/5.jpg',
    timestamp: Date.now() - 3600000 * 5,
    likes: ['user_meera_sen', 'user_zuck'],
    comments: []
  },
  {
    id: 'post_meera_3',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "My School",
    mediaUrl: '/assets/imgs/meera_3.jpg',
    timestamp: Date.now() - 3600000 * 7,
    likes: ['user_akshima', 'user_meera_sen_2'],
    comments: []
  },
  {
    id: 'post_meera_4',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Lunch Break",
    mediaUrl: '/assets/imgs/meera_4.jpg',
    timestamp: Date.now() - 3600000 * 10,
    likes: ['user_zuck', 'user_eduardo'],
    comments: []
  }
];

const INITIAL_SEED_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_meera_sen',
    actorId: 'user_zuck',
    type: 'like',
    message: 'Mark Zuckerberg liked your photo "MANIT Bhopal Campus".',
    read: false,
    timestamp: Date.now() - 1800000,
    targetId: 'post_manit_1'
  }
];

const INITIAL_SEED_POKES = [
  { id: 'poke_1', fromId: 'user_zuck', toId: 'user_meera_sen', timestamp: Date.now() - 3600000 }
];

class DatabaseService {
  constructor() {
    this.init();
  }

  init() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      this.seed();
    } else {
      try {
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse local DB, re-seeding:', err);
        this.seed();
      }
    }
  }

  seed() {
    this.data = {
      users: INITIAL_SEED_USERS,
      posts: INITIAL_SEED_POSTS,
      notifications: INITIAL_SEED_NOTIFICATIONS,
      pokes: INITIAL_SEED_POKES
    };
    this.save();
  }

  save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
  }

  reset() {
    this.seed();
    return this.data;
  }

  // --- Users CRUD ---
  getUsers() {
    return this.data.users || [];
  }

  getUser(id) {
    return this.getUsers().find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: 'user_' + Date.now(),
      name: `${userData.firstName} ${userData.lastName}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatar: userData.avatar || '/assets/imgs/meera_profile_pic.jpg',
      status: 'is now using Facebook 2007!',
      age: userData.age || 25,
      work: userData.work || 'Member at Facebook',
      phone: userData.phone || '+91 9000000000',
      relationship: userData.relationship || 'Single',
      education: userData.education || 'High School / University',
      bio: userData.bio || 'Hello world!',
      interests: 'Social Networking, Technology',
      photos: [{ url: userData.avatar || '/assets/imgs/meera_profile_pic.jpg', caption: 'Profile Photo' }],
      friends: [],
      pendingRequests: []
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(id, updates) {
    const userIndex = this.data.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.data.users[userIndex] = { ...this.data.users[userIndex], ...updates };
      this.save();
      return this.data.users[userIndex];
    }
    return null;
  }

  addPhoto(userId, photoUrl, caption = 'New Photo') {
    const user = this.getUser(userId);
    if (user) {
      if (!user.photos) user.photos = [];
      user.photos.unshift({ url: photoUrl, caption });
      this.save();
      return user.photos;
    }
    return [];
  }

  // --- Posts CRUD ---
  getPosts(filterUserId = null) {
    let posts = [...this.data.posts];
    if (filterUserId) {
      posts = posts.filter(p => p.authorId === filterUserId || p.targetUserId === filterUserId);
    }
    return posts.sort((a, b) => b.timestamp - a.timestamp);
  }

  addPost(authorId, content, mediaUrl = null, targetUserId = null) {
    const newPost = {
      id: 'post_' + Date.now(),
      authorId,
      targetUserId,
      content,
      mediaUrl,
      timestamp: Date.now(),
      likes: [],
      comments: []
    };
    this.data.posts.unshift(newPost);

    if (mediaUrl) {
      this.addPhoto(authorId, mediaUrl, content.slice(0, 30) || 'Uploaded Photo');
    }

    if (!targetUserId) {
      const author = this.getUser(authorId);
      if (author) {
        this.updateUser(authorId, { status: `is ${content.slice(0, 60)}` });
      }
    } else {
      this.addNotification({
        userId: targetUserId,
        actorId: authorId,
        type: 'wall_post',
        message: `${this.getUser(authorId)?.name || 'Someone'} wrote on your Wall.`,
        targetId: newPost.id
      });
    }

    this.save();
    return newPost;
  }

  deletePost(postId, userId) {
    const post = this.data.posts.find(p => p.id === postId);
    if (post && (post.authorId === userId || post.targetUserId === userId)) {
      this.data.posts = this.data.posts.filter(p => p.id !== postId);
      this.save();
      return true;
    }
    return false;
  }

  toggleLike(postId, userId) {
    const post = this.data.posts.find(p => p.id === postId);
    if (post) {
      const hasLiked = post.likes.includes(userId);
      if (hasLiked) {
        post.likes = post.likes.filter(id => id !== userId);
      } else {
        post.likes.push(userId);
        if (post.authorId !== userId) {
          const liker = this.getUser(userId);
          this.addNotification({
            userId: post.authorId,
            actorId: userId,
            type: 'like',
            message: `${liker?.name || 'Someone'} liked your post.`,
            targetId: postId
          });
        }
      }
      this.save();
      return post;
    }
    return null;
  }

  addComment(postId, userId, commentText) {
    const post = this.data.posts.find(p => p.id === postId);
    if (post && commentText.trim()) {
      const newComment = {
        id: 'c_' + Date.now(),
        authorId: userId,
        content: commentText.trim(),
        timestamp: Date.now()
      };
      post.comments.push(newComment);

      if (post.authorId !== userId) {
        const commenter = this.getUser(userId);
        this.addNotification({
          userId: post.authorId,
          actorId: userId,
          type: 'comment',
          message: `${commenter?.name || 'Someone'} commented on your post: "${commentText.slice(0, 30)}..."`,
          targetId: postId
        });
      }

      this.save();
      return post;
    }
    return null;
  }

  // --- Friendship System ---
  sendFriendRequest(fromId, toId) {
    const toUser = this.getUser(toId);
    if (toUser && !toUser.friends.includes(fromId) && !toUser.pendingRequests.includes(fromId)) {
      toUser.pendingRequests.push(fromId);
      const sender = this.getUser(fromId);
      this.addNotification({
        userId: toId,
        actorId: fromId,
        type: 'friend_request',
        message: `${sender?.name || 'Someone'} sent you a friend request.`,
        targetId: fromId
      });
      this.save();
    }
  }

  acceptFriendRequest(currentUserId, requesterId) {
    const user = this.getUser(currentUserId);
    const requester = this.getUser(requesterId);
    if (user && requester) {
      user.pendingRequests = user.pendingRequests.filter(id => id !== requesterId);
      if (!user.friends.includes(requesterId)) user.friends.push(requesterId);
      if (!requester.friends.includes(currentUserId)) requester.friends.push(currentUserId);

      this.addNotification({
        userId: requesterId,
        actorId: currentUserId,
        type: 'friend_accept',
        message: `${user.name} accepted your friend request!`,
        targetId: currentUserId
      });
      this.save();
    }
  }

  rejectFriendRequest(currentUserId, requesterId) {
    const user = this.getUser(currentUserId);
    if (user) {
      user.pendingRequests = user.pendingRequests.filter(id => id !== requesterId);
      this.save();
    }
  }

  removeFriend(userId, friendId) {
    const u1 = this.getUser(userId);
    const u2 = this.getUser(friendId);
    if (u1) u1.friends = u1.friends.filter(id => id !== friendId);
    if (u2) u2.friends = u2.friends.filter(id => id !== userId);
    this.save();
  }

  // --- Pokes ---
  getPokes(userId) {
    return (this.data.pokes || []).filter(p => p.toId === userId);
  }

  pokeUser(fromId, toId) {
    const newPoke = {
      id: 'poke_' + Date.now(),
      fromId,
      toId,
      timestamp: Date.now()
    };
    this.data.pokes.unshift(newPoke);
    const poker = this.getUser(fromId);
    this.addNotification({
      userId: toId,
      actorId: fromId,
      type: 'poke',
      message: `${poker?.name || 'Someone'} poked you!`,
      targetId: fromId
    });
    this.save();
    return newPoke;
  }

  // --- Notifications ---
  getNotifications(userId) {
    return (this.data.notifications || [])
      .filter(n => n.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  addNotification(notif) {
    const newNotif = {
      id: 'notif_' + Date.now(),
      read: false,
      timestamp: Date.now(),
      ...notif
    };
    this.data.notifications.unshift(newNotif);
    this.save();
    return newNotif;
  }

  markNotificationsRead(userId) {
    this.data.notifications.forEach(n => {
      if (n.userId === userId) n.read = true;
    });
    this.save();
  }

  // --- Search Engine ---
  search(query) {
    if (!query || !query.trim()) return { users: [], posts: [] };
    const q = query.toLowerCase().trim();
    const users = this.getUsers().filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.work.toLowerCase().includes(q)
    );
    const posts = this.getPosts().filter(p =>
      p.content.toLowerCase().includes(q)
    );
    return { users, posts };
  }
}

export const db = new DatabaseService();
