// Facebook 2007-2011 Client Database Service with Persistence & Seed Data

const DB_KEY = 'FB_2007_2011_DATABASE_V3';

const INITIAL_SEED_USERS = [
  {
    id: 'user_meera_sen',
    name: 'Meera Sen',
    firstName: 'Meera',
    lastName: 'Sen',
    email: 'meera.sen@facebook.com',
    avatar: '/assets/imgs/meera_4.jpg', // 4th picture set as profile picture
    status: 'is reviewing class lesson plans & field trip photos.',
    network: 'Delhi University / Educator Network',
    hometown: 'Kolkata, India',
    relationship: 'In a relationship',
    work: 'Senior Education Specialist & Teacher',
    education: 'Delhi University (B.Ed & M.A. Literature)',
    bio: 'Passionate educator, literary enthusiast, and student mentor.',
    interests: 'Literature, Teaching, School Field Trips, Indian Art & History',
    photos: [
      '/assets/imgs/meera_1.jpg',
      '/assets/imgs/meera_2.jpg',
      '/assets/imgs/meera_3.jpg',
      '/assets/imgs/meera_4.jpg',
      '/assets/imgs/meera_5.jpg'
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
    avatar: '/assets/imgs/meera_5.jpg',
    status: 'is working on urban restoration projects.',
    network: 'Kolkata Network',
    hometown: 'Kolkata, India',
    relationship: 'Single',
    work: 'Senior Architect at Urban Studio',
    education: 'Jadavpur University',
    bio: 'Designing sustainable urban living spaces.',
    interests: 'Architecture, Heritage Buildings, Sketching',
    photos: ['/assets/imgs/meera_5.jpg'],
    friends: ['user_meera_sen'],
    pendingRequests: []
  },
  {
    id: 'user_meera_sen_3',
    name: 'Meera Sen',
    firstName: 'Meera',
    lastName: 'Sen',
    email: 'meera.bio@facebook.com',
    avatar: '/assets/imgs/meera_2.jpg',
    status: 'is in the lab analyzing molecular biology research.',
    network: 'Mumbai Network',
    hometown: 'Mumbai, India',
    relationship: 'Married',
    work: 'Medical Research Scholar',
    education: 'IIT Bombay',
    bio: 'Biomedical researcher exploring health innovations.',
    interests: 'Genomics, Molecular Biology, Classical Music',
    photos: ['/assets/imgs/meera_2.jpg'],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_meera_kapoor',
    name: 'Meera Kapoor',
    firstName: 'Meera',
    lastName: 'Kapoor',
    email: 'meera.kapoor@facebook.com',
    avatar: '/assets/imgs/2.jpg',
    status: 'is launching her new autumn fashion line!',
    network: 'Delhi Network',
    hometown: 'New Delhi, India',
    relationship: 'Single',
    work: 'Fashion Designer & Stylist',
    education: 'NIFT Delhi',
    bio: 'Creating sustainable fusion ethnic wear.',
    interests: 'Fashion, Textiles, Travel Photography',
    photos: ['/assets/imgs/2.jpg'],
    friends: ['user_akshima'],
    pendingRequests: []
  },
  {
    id: 'user_meera_roy',
    name: 'Meera Roy',
    firstName: 'Meera',
    lastName: 'Roy',
    email: 'meera.roy@facebook.com',
    avatar: '/assets/imgs/5.jpg',
    status: 'is deploying scalable backend microservices.',
    network: 'Bangalore Network',
    hometown: 'Bangalore, India',
    relationship: 'In a relationship',
    work: 'Software Architect at Tech Global',
    education: 'IISc Bangalore',
    bio: 'Passionate about cloud architecture and open source.',
    interests: 'Distributed Systems, Python, Trekking',
    photos: ['/assets/imgs/5.jpg'],
    friends: ['user_dustin'],
    pendingRequests: []
  },
  {
    id: 'user_meera_deshmukh',
    name: 'Meera Deshmukh',
    firstName: 'Meera',
    lastName: 'Deshmukh',
    email: 'meera.d@facebook.com',
    avatar: '/assets/imgs/meera_1.jpg',
    status: 'is editing her latest investigative article.',
    network: 'Pune Network',
    hometown: 'Pune, India',
    relationship: 'Married',
    work: 'Senior Journalist & Columnist',
    education: 'Pune University',
    bio: 'Reporting on socio-economic developments and education.',
    interests: 'Journalism, Books, Social Policy',
    photos: ['/assets/imgs/meera_1.jpg'],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_meera_sharma',
    name: 'Meera Sharma',
    firstName: 'Meera',
    lastName: 'Sharma',
    email: 'meera.sharma@facebook.com',
    avatar: '/assets/imgs/meera_3.jpg',
    status: 'is preparing for the national dance festival in Jaipur.',
    network: 'Jaipur Network',
    hometown: 'Jaipur, India',
    relationship: 'Single',
    work: 'Kathak Dancer & Choreographer',
    education: 'Jaipur University',
    bio: 'Promoting traditional Indian classical performing arts.',
    interests: 'Kathak, Classical Music, Cultural Heritage',
    photos: ['/assets/imgs/meera_3.jpg'],
    friends: [],
    pendingRequests: []
  },
  {
    id: 'user_meera_nair',
    name: 'Meera Nair',
    firstName: 'Meera',
    lastName: 'Nair',
    email: 'meera.nair@facebook.com',
    avatar: '/assets/imgs/meera_4.jpg',
    status: 'is wrapping up filming for her documentary.',
    network: 'Kochi Network',
    hometown: 'Kochi, Kerala',
    relationship: 'In a relationship',
    work: 'Documentary Filmmaker',
    education: 'FTII Pune',
    bio: 'Telling human stories through cinematic lens.',
    interests: 'Documentary, Cinema, Environmental Causes',
    photos: ['/assets/imgs/meera_4.jpg'],
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
    network: 'Harvard / Palo Alto',
    hometown: 'Dobbs Ferry, New York',
    relationship: 'In a relationship with Priscilla Chan',
    work: 'Founder and CEO at Facebook',
    education: 'Harvard University (Computer Science & Psychology)',
    bio: "I'm trying to make the world more open and connected.",
    interests: 'Open Source, Information Flow, Artificial Intelligence, Fencing',
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
    network: 'Harvard / Singapore',
    hometown: 'São Paulo, Brazil',
    relationship: 'Single',
    work: 'Co-founder & Business Manager',
    education: 'Harvard University (Economics)',
    bio: 'Phoenix Club member, investor, and tech entrepreneur.',
    interests: 'Finance, Chess, Meteorology, Startup Investing',
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
    network: 'Silicon Valley',
    hometown: 'Herndon, Virginia',
    relationship: 'It\'s Complicated',
    work: 'President at Facebook / Napster Founder',
    education: 'Oakton High School',
    bio: 'Venture capitalist, music lover, and viral growth believer.',
    interests: 'Napster, Plaxo, Spotify, Virality, Philanthropy',
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
    network: 'Harvard / San Francisco',
    hometown: 'Gainesville, Florida',
    relationship: 'In a relationship',
    work: 'Head of Engineering at Facebook',
    education: 'Harvard University',
    bio: 'Building scalable infrastructure for millions of students.',
    interests: 'Server Architecture, PHP, Asana, Ultimate Frisbee',
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
    network: 'Stanford University',
    hometown: 'New Delhi, India',
    relationship: 'Single',
    work: 'UI/UX Designer',
    education: 'Stanford University (Design)',
    bio: 'Designing nostalgic interfaces and web applications.',
    interests: 'Web Design, Pixel Art, Retro UI, Photography',
    friends: ['user_meera_sen', 'user_eduardo'],
    pendingRequests: ['user_zuck']
  }
];

const INITIAL_SEED_POSTS = [
  {
    id: 'post_meera_1',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Wonderful school bus trip with my students today! 🚌✨ Everyone was so energetic and excited for the outdoor learning session.",
    mediaUrl: '/assets/imgs/meera_1.jpg',
    timestamp: Date.now() - 3600000 * 1.2,
    likes: ['user_zuck', 'user_akshima', 'user_eduardo'],
    comments: [
      {
        id: 'cm_1',
        authorId: 'user_akshima',
        content: 'Such a bright happy photo Meera! The kids look so enthusiastic!',
        timestamp: Date.now() - 3600000 * 1.0
      },
      {
        id: 'cm_2',
        authorId: 'user_zuck',
        content: 'Great update! Glad you are enjoying the classic Wall publisher.',
        timestamp: Date.now() - 3600000 * 0.8
      }
    ]
  },
  {
    id: 'post_meera_2',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Working late at my classroom desk preparing tomorrow's literature & history lesson plans. 📝📚",
    mediaUrl: '/assets/imgs/meera_2.jpg',
    timestamp: Date.now() - 3600000 * 4,
    likes: ['user_eduardo'],
    comments: []
  },
  {
    id: 'post_meera_3',
    authorId: 'user_meera_sen',
    targetUserId: null,
    content: "Group photo with our dedicated students and faculty members outside the main school building!",
    mediaUrl: '/assets/imgs/meera_3.jpg',
    timestamp: Date.now() - 3600000 * 10,
    likes: ['user_akshima', 'user_meera_sen_2'],
    comments: []
  },
  {
    id: 'post_1',
    authorId: 'user_zuck',
    targetUserId: null,
    content: "Welcome to Facebook 2007-2011 edition! Check out your Wall, leave pokes, and add friends across networks.",
    mediaUrl: '/assets/imgs/globe.png',
    timestamp: Date.now() - 3600000 * 15,
    likes: ['user_meera_sen', 'user_eduardo', 'user_sean', 'user_akshima'],
    comments: [
      {
        id: 'c1',
        authorId: 'user_sean',
        content: 'This interface is legendary. Keep moving fast!',
        timestamp: Date.now() - 3600000 * 14
      },
      {
        id: 'c2',
        authorId: 'user_eduardo',
        content: 'Love the classic wall layout, Mark!',
        timestamp: Date.now() - 3600000 * 13
      }
    ]
  }
];

const INITIAL_SEED_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_meera_sen',
    actorId: 'user_zuck',
    type: 'like',
    message: 'Mark Zuckerberg liked your school bus field trip photo.',
    read: false,
    timestamp: Date.now() - 1800000,
    targetId: 'post_meera_1'
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
      avatar: userData.avatar || '/assets/imgs/meera_4.jpg',
      status: 'is now using Facebook 2007!',
      network: 'General Network',
      hometown: userData.hometown || 'Palo Alto, CA',
      relationship: userData.relationship || 'Single',
      work: userData.work || 'Member at Facebook',
      education: userData.education || 'High School / University',
      bio: userData.bio || 'Hello world!',
      interests: 'Social Networking, Technology',
      photos: [userData.avatar || '/assets/imgs/meera_4.jpg'],
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
      u.network.toLowerCase().includes(q) ||
      u.work.toLowerCase().includes(q)
    );
    const posts = this.getPosts().filter(p =>
      p.content.toLowerCase().includes(q)
    );
    return { users, posts };
  }
}

export const db = new DatabaseService();
