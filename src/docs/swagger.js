import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'A comprehensive task management API with projects, users, and real-time chat functionality',
      contact: {
        name: 'Task Manager Team',
        email: 'support@taskmanager.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // User Schemas
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique user identifier'
            },
            name: {
              type: 'string',
              maxLength: 100,
              description: 'User full name'
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'User email address'
            },
            profileImage: {
              type: 'string',
              nullable: true,
              description: 'URL to user profile image'
            },
            role: {
              type: 'string',
              enum: ['admin', 'member'],
              description: 'User role in the system'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the user account is active'
            },
            emailVerified: {
              type: 'boolean',
              description: 'Whether the user email is verified'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['id', 'name', 'email', 'role']
        },
        UserRegister: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              maxLength: 100,
              description: 'User full name'
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'User email address'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password'
            }
          },
          required: ['name', 'email', 'password']
        },
        UserLogin: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            password: {
              type: 'string',
              description: 'User password'
            }
          },
          required: ['email', 'password']
        },
        UserProfile: {
          allOf: [
            { $ref: '#/components/schemas/User' },
            {
              type: 'object',
              properties: {
                ownedProjects: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Project' }
                },
                projectMembers: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ProjectMember' }
                }
              }
            }
          ]
        },
        
        // Project Schemas
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique project identifier'
            },
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Project name'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Project description'
            },
            ownerId: {
              type: 'string',
              format: 'uuid',
              description: 'Project owner user ID'
            },
            isArchived: {
              type: 'boolean',
              description: 'Whether the project is archived'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Project creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['id', 'name', 'ownerId']
        },
        ProjectCreate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Project name'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Project description'
            }
          },
          required: ['name']
        },
        ProjectUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Project name'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Project description'
            },
            isArchived: {
              type: 'boolean',
              description: 'Whether the project is archived'
            }
          }
        },
        ProjectInvite: {
          type: 'object',
          properties: {
            user: {
              type: 'string',
              format: 'email',
              description: 'Email of user to invite'
            }
          },
          required: ['user']
        },
        
        // ProjectMember Schemas
        ProjectMember: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique project member identifier'
            },
            projectId: {
              type: 'string',
              format: 'uuid',
              description: 'Project ID'
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'User ID'
            },
            role: {
              type: 'string',
              enum: ['owner', 'member'],
              description: 'Member role in the project'
            },
            joinedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the user joined the project'
            }
          },
          required: ['id', 'projectId', 'userId', 'role']
        },
        
        // Task Schemas
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique task identifier'
            },
            projectId: {
              type: 'string',
              format: 'uuid',
              description: 'Project ID this task belongs to'
            },
            title: {
              type: 'string',
              maxLength: 300,
              description: 'Task title'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Task description'
            },
            status: {
              type: 'string',
              enum: ['todo', 'in_progress', 'completed'],
              description: 'Current task status'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Task priority level'
            },
            dueDate: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Task due date'
            },
            assignedTo: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              description: 'User ID of assigned user'
            },
            createdBy: {
              type: 'string',
              format: 'uuid',
              description: 'User ID of task creator'
            },
            completedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the task was completed'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['id', 'projectId', 'title', 'status', 'priority', 'createdBy']
        },
        TaskCreate: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              maxLength: 300,
              description: 'Task title'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Task description'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              default: 'medium',
              description: 'Task priority level'
            },
            dueDate: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Task due date'
            },
            assignedTo: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              description: 'User ID of assigned user'
            }
          },
          required: ['title']
        },
        TaskUpdate: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              maxLength: 300,
              description: 'Task title'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Task description'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Task priority level'
            },
            dueDate: {
              type: 'string',
              format: 'date',
              nullable: true,
              description: 'Task due date'
            }
          }
        },
        TaskStatusUpdate: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['todo', 'in_progress', 'completed'],
              description: 'New task status'
            }
          },
          required: ['status']
        },
        TaskAssign: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email of user to assign task to'
            }
          },
          required: ['email']
        },
        
        // Comment Schemas
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique comment identifier'
            },
            taskId: {
              type: 'string',
              format: 'uuid',
              description: 'Task ID this comment belongs to'
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'User ID of comment author'
            },
            content: {
              type: 'string',
              description: 'Comment content'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Comment creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['id', 'taskId', 'userId', 'content']
        },
        CommentCreate: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              format: 'uuid',
              description: 'Task ID this comment belongs to'
            },
            content: {
              type: 'string',
              description: 'Comment content'
            }
          },
          required: ['taskId', 'content']
        },
        
        // Chat Schemas
        Chat: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique chat identifier'
            },
            type: {
              type: 'string',
              enum: ['direct', 'group', 'project'],
              description: 'Type of chat'
            },
            projectId: {
              type: 'string',
              format: 'uuid',
              description: 'Project ID this chat belongs to'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the chat is active'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Chat creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['id', 'type', 'projectId']
        },
        ChatMessage: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique message identifier'
            },
            chatId: {
              type: 'string',
              format: 'uuid',
              description: 'Chat ID this message belongs to'
            },
            senderId: {
              type: 'string',
              format: 'uuid',
              description: 'User ID of message sender'
            },
            content: {
              type: 'string',
              description: 'Message content'
            },
            isEdited: {
              type: 'boolean',
              description: 'Whether the message has been edited'
            },
            editedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the message was last edited'
            },
            replyToId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
              description: 'ID of message this is replying to'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Message creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          },
          required: ['id', 'chatId', 'senderId', 'content']
        },
        
        // Response Schemas
        ApiResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['success', 'error'],
              description: 'Response status'
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['success'],
              description: 'Response status'
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            data: {
              $ref: '#/components/schemas/User'
            },
            accessToken: {
              type: 'string',
              description: 'JWT access token'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['error'],
              description: 'Error status'
            },
            message: {
              type: 'string',
              description: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Detailed error information'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/modules/*/*.route.js', './src/docs/paths/*.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };