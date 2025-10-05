import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

// Mock data - replace with actual API call
const mockTeamData: TeamMember[] = [
  {
    id: '001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'Back-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=john'
  },
  {
    id: '002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=jane'
  },
  {
    id: '003',
    name: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    id: '004',
    name: 'Emily Brown',
    email: 'emily.brown@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=emily'
  },
  {
    id: '005',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '006',
    name: 'Sarah Miller',
    email: 'sarah.miller@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '007',
    name: 'Kevin Lee',
    email: 'kevin.lee@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=kevin1'
  },
  {
    id: '008',
    name: 'Kevin Lee',
    email: 'kevin.lee@email.com',
    role: 'Front-end Dev',
    avatar: 'https://i.pravatar.cc/150?u=kevin2'
  }
]

export default function MyTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchTeamData = async () => {
      try {
        setLoading(true)
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTeamMembers(mockTeamData)
      } catch (error) {
        console.error('Error fetching team data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [])

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-lg'>Loading team members...</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full bg-background'>
      <div className='flex-1 p-6'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Clother Project</h1>
        </div>

        {/* Team Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          {/* Table Header */}
          <div className='grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200'>
            <div className='text-sm font-medium text-gray-600'>ID</div>
            <div className='text-sm font-medium text-gray-600'>Avatar</div>
            <div className='text-sm font-medium text-gray-600'>Name</div>
            <div className='text-sm font-medium text-gray-600'>Email</div>
            <div className='text-sm font-medium text-gray-600'>Role</div>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-200'>
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}
              >
                {/* ID */}
                <div className='flex items-center'>
                  <span className='text-sm text-gray-900 font-medium'>{member.id}</span>
                </div>

                {/* Avatar */}
                <div className='flex items-center'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className='bg-blue-500 text-white font-semibold'>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name */}
                <div className='flex items-center'>
                  <span className='text-sm text-gray-900 font-medium'>{member.name}</span>
                </div>

                {/* Email */}
                <div className='flex items-center'>
                  <span className='text-sm text-gray-600'>{member.email}</span>
                </div>

                {/* Role */}
                <div className='flex items-center'>
                  <span className='text-sm text-gray-900'>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
