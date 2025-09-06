import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import styles from './bubble.module.css'

const BubbleText = ({ text }: { text: string }) => {
  return (
    <span className="text-2xl font-bold text-white">
      {text.split("").map((char, idx) => (
        <span className={styles.hoverText} key={idx}>
          {char}
        </span>
      ))}
    </span>
  );
};

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="md:flex-1 flex items-center gap-2">
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="md:hidden"
        />
        <div className="hidden md:flex items-center gap-2">
          <Image 
            src="/assets/icons/logo-icon.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <BubbleText text="LiveDocs" />
        </div>
      </Link>
      {children}
    </div>
  )
}

export default Header