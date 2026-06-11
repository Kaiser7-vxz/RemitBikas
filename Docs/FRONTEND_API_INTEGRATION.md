# Frontend - Backend Integration Guide

## 🔌 Connecting Frontend to Backend API

### API Client Setup (src/lib/api.ts)

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
```

## 🔐 Authentication Usage

### Login Component Example
```typescript
import apiClient from '@/lib/api';

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      // Store token
      localStorage.setItem('authToken', response.data.token);
      
      // Save user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
}
```

### Signup Component Example
```typescript
const handleSignup = async (email: string, password: string, name: string) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      email,
      password,
      name,
      role: 'CITIZEN',
    });
    
    localStorage.setItem('authToken', response.data.token);
    navigate('/dashboard');
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
```

## 📦 Project Data Usage

### Fetch Projects in Home Page
```typescript
import { useEffect, useState } from 'react';
import apiClient from '@/lib/api';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get projects
        const projectsRes = await apiClient.get('/projects?limit=8');
        setProjects(projectsRes.data.projects);

        // Get statistics
        const statsRes = await apiClient.get('/projects/stats/overview');
        setStats(statsRes.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display stats */}
      <StatCard value={stats?.total} label="Active Projects" />
      
      {/* Display projects */}
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

## 💰 Contribution System

### Create Contribution
```typescript
const handleContribute = async (projectId: string, amount: number) => {
  try {
    const response = await apiClient.post('/contributions', {
      projectId,
      amount,
      paymentMethod: 'BANK_TRANSFER',
      description: 'Supporting local development',
    });

    toast.success('Contribution created successfully!');
    fetchContributions(); // Refresh list
  } catch (error) {
    toast.error('Failed to create contribution');
  }
};
```

### View User Contributions
```typescript
useEffect(() => {
  const fetchUserContributions = async () => {
    try {
      const response = await apiClient.get('/contributions/user/my-contributions');
      setContributions(response.data.contributions);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch contributions:', error);
    }
  };

  fetchUserContributions();
}, []);
```

## 📊 Dashboard Integration

### Fetch Dashboard Data
```typescript
useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const response = await apiClient.get('/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    }
  };

  fetchDashboard();
}, []);
```

## 🎯 Project Details Page

### Fetch Single Project
```typescript
import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await apiClient.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div>Progress: {project.completionPercentage}%</div>
      <div>Budget: ₨{project.totalBudget}</div>
      
      {/* Display milestones */}
      {project.milestones?.map(milestone => (
        <MilestoneCard key={milestone.id} milestone={milestone} />
      ))}
      
      {/* Display contributions */}
      {project.contributions?.map(contrib => (
        <ContributionItem key={contrib.id} contribution={contrib} />
      ))}
    </div>
  );
}
```

## 🔔 Notification Handling

### Real-time Notification Updates
```typescript
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      // Fetch from user dashboard
      const response = await apiClient.get('/dashboard');
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Fetch on mount
  fetchNotifications();

  // Poll every 30 seconds
  const interval = setInterval(fetchNotifications, 30000);

  return () => clearInterval(interval);
}, []);
```

## 🤖 AI Bot Integration

### Send Message to AI
```typescript
const handleSendMessage = async (message: string) => {
  // For now, simulate AI response
  // In future, connect to: /api/ai/chat or similar endpoint
  
  const userMsg = { id: Date.now(), sender: 'user', text: message };
  setMessages(prev => [...prev, userMsg]);

  // Simulate delay
  setTimeout(() => {
    const aiMsg = {
      id: Date.now(),
      sender: 'ai',
      text: 'I can help with project information, contributions, and more!',
    };
    setMessages(prev => [...prev, aiMsg]);
  }, 1000);
};
```

## 🗺️ Map Integration

### Display Projects on Map
```typescript
import MapView from '@/components/MapView';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <MapView 
        projects={projects}
        onProjectClick={(projectId) => navigate(`/projects/${projectId}`)}
      />
    </div>
  );
}
```

## 📋 Error Handling Pattern

```typescript
const apiCall = async () => {
  try {
    const response = await apiClient.get('/projects');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      navigate('/login');
    } else if (error.response?.status === 403) {
      // Forbidden - show permission error
      toast.error('You do not have permission to perform this action');
    } else if (error.response?.status === 404) {
      // Not found
      toast.error('Resource not found');
    } else {
      // Server error
      toast.error(error.message || 'An error occurred');
    }
    return null;
  }
};
```

## 🔄 Filtering & Pagination

### Fetch Filtered Projects
```typescript
const fetchFilteredProjects = async (filters: {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.type) params.append('type', filters.type);
  if (filters.search) params.append('search', filters.search);
  params.append('page', (filters.page || 1).toString());
  params.append('limit', (filters.limit || 10).toString());

  try {
    const response = await apiClient.get(
      `/projects?${params.toString()}`
    );
    setProjects(response.data.projects);
    setPagination(response.data.pagination);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
};
```

## 📝 Form Submission Pattern

```typescript
const handleFormSubmit = async (formData: any) => {
  setLoading(true);
  setError(null);

  try {
    const response = await apiClient.post('/contributions', formData);
    
    toast.success('Success!');
    onSuccess(response.data);
  } catch (error) {
    setError(error.message);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 🔑 Token Management

```typescript
// Store token after login
localStorage.setItem('authToken', token);

// Retrieve token for manual requests
const token = localStorage.getItem('authToken');

// Clear token on logout
const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  navigate('/login');
};

// Check if user is logged in
const isLoggedIn = !!localStorage.getItem('authToken');
```

## 🌐 Environment Variables

Create `.env` in frontend root:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_UPLOAD_URL=http://localhost:5000/uploads
```

Or in `.env.production`:
```
REACT_APP_API_URL=https://api.remitbikas.com/api
REACT_APP_UPLOAD_URL=https://api.remitbikas.com/uploads
```

## 🧪 Testing API Endpoints

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"citizen@example.com","password":"citizen123"}'

# Get projects
curl http://localhost:5000/api/projects

# Create contribution (with token)
curl -X POST http://localhost:5000/api/contributions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"proj_1","amount":50000,"paymentMethod":"BANK_TRANSFER"}'
```

### Using Postman
1. Import API endpoints
2. Set Authorization header with Bearer token
3. Test each endpoint
4. Verify response structure

---

**Your frontend is now ready to communicate with the backend API!**
