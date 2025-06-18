import { Plus } from 'lucide-react';

export const AddPageButton = ({ onClick }: { onClick: () => void }) => (
  <div className='group flex items-center justify-center text-gray-400 text-sm'>
    <div className='group-hover:hidden transition-all duration-200 ease-in-out'>
      <span className='duration-200 ease-in-out'>---</span>
    </div>

    <div className='hidden group-hover:flex items-center transition-all '>
      <span className='duration-200 ease-in-out'>---</span>
      <Plus
        className='text-black bg-white border cursor-pointer border-gray-300 hover:border-gray-400 rounded-full shadow-sm'
        onClick={onClick}
        size={18}
      />
      <span className='duration-200 ease-in-out'>---</span>
    </div>
  </div>
);
