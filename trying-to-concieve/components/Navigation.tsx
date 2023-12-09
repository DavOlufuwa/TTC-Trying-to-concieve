import Link from "next/link";

const Navigation = () => {
  return (
    <ul className="flex justify-start gap-10">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/superadmin">SuperAdmins</Link>
      </li>
      <li>
        <Link href="/blog-admin" target="_blank">Blog</Link>
      </li>
      <li>
        <Link href="/users">Users</Link>
      </li>
    </ul>
  );
}

export default Navigation;