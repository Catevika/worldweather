import Hamburger from '@/assets/hamburger.svg?react';
import LightDarkToggle from '@/components/LightDarkToggle';

type Props = {
  setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className="flex justify-end gap-8 z-1001 w-full h-16 p-4 bg-background sticky top-0 xs:hidden">
      <LightDarkToggle />

      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className='size-6' />
      </button>
    </div>
  );
};