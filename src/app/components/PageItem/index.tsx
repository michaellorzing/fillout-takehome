import { FormPage } from '../../page';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Info,
  CircleCheck,
  FileText,
  EllipsisVertical,
  Flag,
  PencilLine,
  Clipboard,
  Copy,
  Trash,
} from 'lucide-react';
import { Menu, Item, Separator, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'page_context_menu';

export const PageItem = ({
  page,
  active,
  handleItemClick,
}: {
  page: FormPage;
  active: boolean;
  handleItemClick: (id: string) => void;
}) => {
  const { name, id } = page;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const { show } = useContextMenu();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    show({ event: e, id: MENU_ID, props: { pageId: page.id } });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderIcon = (name: string) => {
    const activeStyles = active
      ? 'text-yellow-600'
      : 'text-gray-400 group-hover:text-yellow-600';
    switch (name) {
      case 'Info':
        return <Info className={activeStyles} />;
      case 'Ending':
        return <CircleCheck className={activeStyles} />;
      default:
        return <FileText className={activeStyles} />;
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners} // drag works across the entire item
        onContextMenu={handleContextMenu}
        onPointerUp={(e) => {
          // Only trigger click-like behavior if it's a primary (left) click
          if (e.button === 0) {
            console.log('Pointer up -> PageItem clicked', id);
            handleItemClick(id);
          }
        }}
        className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-md transition-colors font-bold cursor-pointer select-none ${
          active
            ? 'bg-white text-black border-gray-300'
            : 'bg-gray-100 border-gray-100 text-gray-400 hover:bg-white hover:text-black'
        }`}
      >
        {renderIcon(name)}
        <span>{name}</span>
        <button className='p-1 rounded-md hover:bg-white/10 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer'>
          <EllipsisVertical className='text-gray-400' />
        </button>
      </div>
      <Menu id={MENU_ID}>
        <Item disabled>
          <span className='text-lg text-black font-semibold'>Settings</span>
        </Item>
        <Separator />
        <Item>
          <Flag className='text-blue-700 mr-2 font-semibold' />
          <span className='text-black'>Set as first page</span>
        </Item>
        <Item>
          <PencilLine className='text-gray-400 mr-2 font-semibold' />
          <span className='text-black'>Rename</span>
        </Item>
        <Item>
          <Copy className='text-gray-400 mr-2 font-semibold' />
          <span className='text-black'>Copy</span>
        </Item>
        <Item>
          <Clipboard className='text-gray-400 mr-2 font-semibold' />
          <span className='text-black'>Duplicate</span>
        </Item>
        <Separator />
        <Item>
          <Trash className='text-red-600 mr-2 font-semibold' />
          <span className='text-red-600'>Delete</span>
        </Item>
      </Menu>
    </>
  );
};
