import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react'

export function RecentSales({farmers}:any) {
  console.log(farmers);
  
  return (
    <div className='space-y-8'>
     {
      !farmers? <div>Loafing....</div>:
      <>
      {
        farmers?.map((farmer:any) =>  {
           return <div className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src='/avatars/01.png' alt='Avatar' />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{farmer.firstName} {farmer.lastName}</p>
            <p className='text-sm text-muted-foreground'>
              +{farmer.phoneNumber}
            </p>
          </div>
          <div className='ml-auto font-medium'>{farmer?.sex == "FEMALE"?<IconGenderFemale/>:<IconGenderMale/>}</div>
        </div>
        })
      }
      </>
     }

    </div>
  )
}
