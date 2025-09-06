import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import FloatingHeader from '@/components/FloatingHeader';
import Notifications from '@/components/Notifications';
import { GridBeams } from '@/components/magicui/grid-beams';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main className="home-container relative">
      <GridBeams
        gridSize={60}
        gridColor="rgba(255, 255, 255, 0.05)"
        rayCount={12}
        rayOpacity={0.3}
        raySpeed={1.0}
        rayLength="35vh"
        gridFadeStart={5}
        gridFadeEnd={90}
        className="absolute inset-0 w-full h-full"
      >
        <FloatingHeader showAuth={false}>
          <div className="flex items-center gap-2 lg:gap-4">
            <Notifications />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </FloatingHeader>

        {roomDocuments.data.length > 0 ? (
          <div className="document-list-container relative z-10 mt-40">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image 
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg font-semibold text-white">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ): (
        <div className="document-list-empty">
          <Image 
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto opacity-60"
          />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-white">No documents yet</h3>
            <p className="text-blue-100">Create your first document to get started</p>
          </div>
          <AddDocumentBtn 
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
        )}
      </GridBeams>
    </main>
  )
}

export default Dashboard
