import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import Loader from "../components/Loader";

export default function SingleNamePage() {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let mounted = true;
		async function fetchName() {
			setLoading(true);
			setError("");
			try {
				const res = await api.get(`/names/${id}`);
				if (!mounted) return;
				setData(res.data);
				// update document title for better UX/SEO
				if (res?.data?.name) {
					document.title = `${res.data.name} — Baby Names`;
				}
			} catch (err) {
				if (!mounted) return;
				setError(err?.response?.data?.message || "Failed to load name.");
			} finally {
				if (mounted) setLoading(false);
			}
		}
		if (id) fetchName();
		return () => {
			mounted = false;
		};
	}, [id]);

	if (loading) return <Loader text="Loading name details..." />;

	if (error)
		return (
			<div className="container mx-auto max-w-3xl py-10">
				<div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
					{error}
				</div>
				<div className="mt-4">
					<Link to="/names" className="text-blue-600 hover:underline">
						← Back to names
					</Link>
				</div>
			</div>
		);

	if (!data)
		return (
			<div className="container mx-auto max-w-3xl py-10">
				<p className="text-gray-600">No data found.</p>
				<div className="mt-4">
					<Link to="/names" className="text-blue-600 hover:underline">
						← Back to names
					</Link>
				</div>
			</div>
		);

	const genderBadge =
		data.gender === "boy"
			? { label: "👦 ছেলে", bg: "bg-blue-100", text: "text-blue-700" }
			: data.gender === "girl"
			? { label: "👧 মেয়ে", bg: "bg-pink-100", text: "text-pink-700" }
			: { label: "N/A", bg: "bg-gray-100", text: "text-gray-700" };

	return (
		<div className="container mx-auto max-w-3xl py-10 px-4">
			<div className="mb-6">
				<Link to="/names" className="text-blue-600 hover:underline">
					← Back to names
				</Link>
			</div>

			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="flex items-center justify-between gap-4">
					<h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
					<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${genderBadge.bg} ${genderBadge.text}`}>
						{genderBadge.label}
					</span>
				</div>

				{data.meaning ? (
					<p className="mt-4 text-gray-700 leading-relaxed">{data.meaning}</p>
				) : (
					<p className="mt-4 text-gray-500 italic">Meaning not provided.</p>
				)}

				<div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
					{data.origin?.name || data.origin ? (
						<div className="rounded-md bg-gray-50 p-3">
							<p className="text-xs uppercase text-gray-500">Origin</p>
							<p className="text-sm font-medium text-gray-800">
								{data.origin?.name || data.origin}
							</p>
						</div>
					) : null}

					{data.category?.name || data.category ? (
						<div className="rounded-md bg-gray-50 p-3">
							<p className="text-xs uppercase text-gray-500">Category</p>
							<p className="text-sm font-medium text-gray-800">
								{data.category?.name || data.category}
							</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

