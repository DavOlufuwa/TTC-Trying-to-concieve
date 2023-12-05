import Link from "next/link";

const Navigation = () => {
  return (
    <ul className="flex justify-start gap-10">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/superadmin">Create Super Admin</Link>
      </li>
      <li>
        <Link href="/blog-admin" target="_blank">Blog Post</Link>
      </li>
    </ul>
  );
}

export default Navigation;