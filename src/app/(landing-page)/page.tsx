import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="flex justify-between items-center min-h-screen h-full"
    >
      <Link
        href="/admin"
        className={buttonVariants({
          variant: "default",
        })}
      >
        Admin
      </Link>
      <Button>
        Seller
      </Button>
      <Button>
        Buyer
      </Button>
    </section>
  );
}
