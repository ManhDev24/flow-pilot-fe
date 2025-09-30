'use client'

import { useState } from 'react'
import {
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  Flag,
  Plus,
  MessageSquare,
  Paperclip,
  Edit3,
  Download,
  Upload,
  ArrowDownWideNarrow,
  ListFilter,
  ClipboardList,
  Tag,
  Star,
  CircleDotDashed
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Input } from '@/app/components/ui/input'
import { Badge } from '@/app/components/ui/badge'
import { Textarea } from '@/app/components/ui/textarea'
import { Separator } from '@/app/components/ui/separator'
import { Checkbox } from '@/app/components/ui/checkbox'
import { stat } from 'fs'

export default function MyTasksPage() {
  const [selectedTask, setSelectedTask] = useState('design-marketing')
  const [newComment, setNewComment] = useState('')

  const tasks = [
    {
      id: 'design-marketing',
      title: 'Design Marketing Campaign Visuals',
      description:
        'Develop compelling visual assets for the upcoming Q3 marketing campaign, including social media banners, email headers, and website hero images. Ensure consistency with brand guidelines and target audience preferences. Collaborate closely with the marketing team for feedback and iterations.',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Alice Johnson',
      date: '2025-07-04',
      comments: 2,
      attachments: 2,
      views: 4,
      statusColor: 'bg-red-600',
      statusBorder: 'border-red-600',
      statusBg: 'bg-red-50',
      priorityColor: 'bg-red-100 text-red-700 border border-red-600'
    },
    {
      id: 'review-financial',
      title: 'Review Q2 Financial Report',
      description: 'Analyze the Q2 financial report for discrepancies, provide insights on revenue',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Charlie Green',
      date: '2025-04-05',
      comments: 1,
      attachments: 0,
      views: 3,
      statusColor: 'bg-blue-500',
      statusBorder: 'border-blue-500',
      statusBg: 'bg-blue-50',
      priorityColor: 'bg-yellow-100 text-yellow-700 border border-yellow-600'
    },
    {
      id: 'onboard-employee',
      title: 'Onboard New Employee - Sarah',
      description: 'Prepare all necessary documentation, access credentials, and welcome kit for new hire Sarah.',
      status: 'Completed',
      priority: 'Low',
      assignee: 'Eva White',
      date: '2025-02-22',
      comments: 1,
      attachments: 0,
      views: 4,
      statusColor: 'bg-green-500',
      statusBorder: 'border-green-500',
      statusBg: 'bg-green-50',
      priorityColor: 'bg-green-100 text-green-700 border border-green-600'
    }
  ]

  const selectedTaskData = tasks.find((task) => task.id === selectedTask)

  const checklist = [
    { id: 1, text: 'Create social media banner mockups', completed: true },
    { id: 2, text: 'Develop email header designs', completed: false },
    { id: 3, text: 'Prepare website hero image concepts', completed: false },
    { id: 4, text: 'Get final approval from marketing lead', completed: false }
  ]

  const activityLog = [
    { type: 'create', user: 'System', action: 'Task created', time: '2024-07-24 06:00 AM' },
    { type: 'status', user: 'Alice Johnson', action: 'Status changed to In Progress', time: '2024-07-24 06:36 AM' },
    { type: 'comment', user: 'Bob Miller', action: 'Added a comment', time: '2024-07-25 10:30 AM' }
  ]

  const comments = [
    {
      id: 1,
      user: 'Bob Miller',
      avatar: '/bob-portrait.png',
      text: "Initial concepts look promising. Let's review on Monday morning to discuss revisions.",
      time: '2024-07-25 10:30 AM'
    },
    {
      id: 2,
      user: 'Alice Johnson',
      avatar: '/alice-in-wonderland.png',
      text: "Agreed, I'll have a more polished version ready by then.",
      time: '2024-07-25 11:00 AM'
    }
  ]

  const attachments = [
    { name: 'Brand_Guidelines_V2.pdf', size: '2.5 MB', type: 'pdf' },
    { name: 'Campaign_Moodboard.png', size: '1.8 MB', type: 'image' }
  ]

  return (
    <div className=' h-screen'>
      <div className='flex-1 flex'>
        <div className='w-96 bg-white border-r border-gray-200 flex flex-col'>
          <div className='p-4 border-b border-gray-200'>
            <h1 className='text-xl font-semibold text-gray-900 mb-4'>My Tasks</h1>
            <div className='flex space-x-2'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input placeholder='Search tasks...' className='pl-10' />
              </div>
              <Button variant='outline' size='sm'>
                <ListFilter className='w-4 h-4' />
              </Button>
              <Button variant='outline' size='sm'>
                <ArrowDownWideNarrow className='w-4 h-4' />
              </Button>
            </div>
          </div>

          <div className='flex-1 p-2 '>
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className={`
                  p-4 mb-3 cursor-pointer transition rounded-xl border-2
                  hover:shadow-md 
                  ${selectedTask === task.id ? `${task.statusBg} ${task.statusBorder}` : 'border-gray-200 bg-white'}
                `}
              >
                <div className='flex items-start justify-between mb-2'>
                  <h3 className='font-semibold text-gray-900 text-sm '>{task.title}</h3>
                </div>
                <p className='text-xs text-gray-600 mb-3 line-clamp-2'>{task.description}</p>
                <div className=' text-xs'>
                  <div className='flex items-center  '>
                    <div className='flex items-center w-1/2 space-x-1'>
                      <Calendar className='w-4 h-4 text-blue-700' />
                      <span className='text-gray-500'>{task.date}</span>
                    </div>
                    <div className='flex items-center space-x-1 '>
                      <User className='w-4 h-4 text-blue-700' />
                      <span className='text-gray-500'>{task.assignee}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between mt-2 text-xs text-gray-500'>
                  <div className='flex items-center space-x-2'>
                    <Badge className={`${task.statusColor} text-white text-xs rounded-2xl px-2 py-1`}>
                      {task.status}
                    </Badge>
                  </div>
                  <div className='flex items-center space-x-3'>
                    {task.comments > 0 && (
                      <span className='flex items-center'>
                        <MessageSquare className='w-3 h-3 mr-1' />
                        {task.comments}
                      </span>
                    )}
                    {task.attachments > 0 && (
                      <span className='flex items-center'>
                        <Paperclip className='w-3 h-3 mr-1' />
                        {task.attachments}
                      </span>
                    )}
                    {task.views > 0 && (
                      <span className='flex items-center'>
                        <ClipboardList className='w-3 h-3 mr-1' />
                        {task.views}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Detail */}
        <div className='flex-1 bg-white overflow-y-auto'>
          {selectedTaskData && (
            <div className='p-6'>
              <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-900'>{selectedTaskData.title}</h1>
                <p className='text-2xl font-semibold text-gray-900 mb-4'>(Deadline Approaching)</p>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  {selectedTaskData.description} Ensure consistency with brand guidelines and target audience
                  preferences. Collaborate closely with the marketing team for feedback and iterations.
                </p>
                <Separator className='my-6' />

                <div className='flex gap-6 mb-8'>
                  <div className='flex flex-col  w-1/2 gap-4'>
                    <div className='flex items-center space-x-2'>
                      <User className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Assignee:</span>
                      <span className='text-sm font-medium'>{selectedTaskData.assignee}</span>
                      <Avatar className='w-6 h-6'>
                        <AvatarImage src='/assignee.jpg' />
                        <AvatarFallback className='text-xs'>E</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Tag className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Status:</span>
                      <Badge className={`${selectedTaskData.statusColor} text-white text-xs rounded-2xl px-2 py-1`}>
                        {selectedTaskData.status}
                      </Badge>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Deadline:</span>
                      <span className='text-sm font-medium text-red-600'>{selectedTaskData.date}</span>
                    </div>
                    <div></div>
                    <div className='flex items-center space-x-2'>
                      <Star className='w-4 h-4 text-blue-700' />
                      <span className='text-sm font-semibold'>Priority:</span>
                      <Badge className={`${selectedTaskData.priorityColor}  text-xs rounded-2xl px-2 py-1`}>
                        {selectedTaskData.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Checklist */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Checklist (3/4)</h3>
                  <div className='space-y-3'>
                    {checklist.map((item) => (
                      <div key={item.id} className='flex items-center space-x-3'>
                        <Checkbox
                          checked={item.completed}
                          className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
                        />
                        <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Activity Log */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Activity Log (3)</h3>
                  <div className='space-y-3'>
                    {activityLog.map((activity, index) => (
                      <div key={index} className='flex items-center space-x-3'>
                        <div className='flex items-center justify-center'>
                          {activity.type === 'create' && <Plus className='w-5 h-5 text-blue-600' />}
                          {activity.type === 'status' && <CircleDotDashed className='w-5 h-5 text-blue-600' />}
                          {activity.type === 'comment' && <MessageSquare className='w-5 h-5 text-blue-600' />}
                        </div>

                        {/* nội dung + time cùng hàng */}
                        <div className=' flex  items-center'>
                          <p className='text-sm text-gray-900 mr-1'>
                            <span className='font-medium'>{activity.user}</span> {activity.action}
                          </p>
                          <span className='text-xs text-gray-500'>{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Comments */}
                <div className='mb-8'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Comments (2)</h3>
                  <div className='space-y-4 mb-4'>
                    {comments.map((comment) => (
                      <div key={comment.id} className='flex space-x-3'>
                        <Avatar className='w-8 h-8'>
                          <AvatarImage src={comment.avatar || '/placeholder.svg'} />
                          <AvatarFallback>
                            {comment.user
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                          <div className='p-3'>
                            <p className='text-sm font-semibold text-gray-900'>{comment.user}</p>
                            <span className='inline-flex items-baseline flex-wrap'>
                              <span className='text-sm text-gray-700'>{comment.text}</span>
                              <span className='text-xs text-gray-500 ml-2'>{comment.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className='my-6' />

                  <div className='flex space-x-3'>
                    <div className='flex-1'>
                      <Textarea
                        placeholder='Add a comment...'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className='mb-2'
                      />
                      <Button className='bg-indigo-600 hover:bg-indigo-700'>Add Comment</Button>
                    </div>
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Notes */}
                <div className='mb-8'>
                  <div className=' mb-1'>
                    <h3 className='text-lg font-semibold text-gray-900'>Notes</h3>
                  </div>

                  <div className=' p-4'>
                    <p className='text-sm text-gray-700'>
                      Remember to incorporate the new product imagery for the email campaign. Focus on bright, inviting
                      colors.
                    </p>
                  </div>
                  <div className='flex justify-end'>
                    <Button variant='ghost' size='sm'>
                      <Edit3 className='w-3 h-3 mr-1' />
                      Edit Notes
                    </Button>
                  </div>
                </div>

                <Separator className='my-6' />

                {/* Attachments */}
                <div>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>Attachments (2)</h3>
                  </div>
                  <div className='space-y-3'>
                    {attachments.map((attachment, index) => (
                      <div key={index} className='flex items-center justify-between p-3  rounded-lg'>
                        <div className='flex items-center space-x-3'>
                          <div className='w-8 h-8 rounded flex items-center justify-center'>
                            <Paperclip className='w-4 h-4 text-blue-600' />
                          </div>
                          <div>
                            <p className='text-sm font-medium text-gray-900'>{attachment.name}</p>
                            <p className='text-xs text-gray-500'>{attachment.size}</p>
                          </div>
                        </div>
                        <Button variant='ghost' size='sm'>
                          <Download className='w-4 h-4 mr-2' />
                          Download
                        </Button>
                      </div>
                    ))}
                    <Button variant='outline' size='sm' className='w-full mt-2'>
                      <Upload className='w-4 h-4 mr-2' />
                      Upload Attachment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
