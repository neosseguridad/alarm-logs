
import Link from "next/link";
import Image from "next/image";

export async function getServerSideProps(context) {
    const page = Math.max(1, Number(context.query.page) || 1);

    const res = await fetch(`${process.env.backend}/logs/${page}`);

    if (!res.ok) {
        return {
            props: {
                logs_page: [],
                has_previous: page > 1,
                has_next: false,
                page,
                load_error: true,
            },
        };
    }

    const logs_data = await res.json();

    return {
        props: {
            logs_page: logs_data.logs ?? [],
            has_previous: logs_data.has_previous,
            has_next: logs_data.has_next,
            page,
            load_error: false,
        },
    };
}

function PaginationButton({ href, disabled, children, label }) {
    return (
        <Link
            href={href}
            scroll={false}
            aria-label={label}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={e => {
                if (disabled) e.preventDefault();
            }}
            className={`inline-flex h-10 min-w-10 items-center justify-center
                rounded-lg border px-3 text-sm font-semibold transition
                ${
                    disabled
                        ? "cursor-not-allowed border-stone-200 text-stone-300 dark:border-stone-700 dark:text-stone-600"
                        : "border-stone-200 bg-white text-stone-700 hover:border-lime-400 hover:bg-lime-50 hover:text-lime-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-lime-700 dark:hover:bg-lime-950"
                }`}
        >
            {children}
        </Link>
    );
}

export default function LogsList(props) {
    const previousPage = props.page - 1;
    const nextPage = props.page + 1;

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto w-full max-w-6xl">

                {/* Header */}
                <header className="mb-8 flex flex-col items-center">
                    <Link
                        href="/"
                        aria-label="Volver al inicio"
                        className="mb-5 rounded-xl p-2 transition hover:bg-lime-100 dark:hover:bg-lime-900/30"
                    >
                        <Image
                            src="/logo.png"
                            width={140}
                            height={70}
                            className="block h-auto w-[120px] dark:hidden"
                            alt="Logo"
                            priority
                        />
                        <Image
                            src="/logo-dark.png"
                            width={140}
                            height={70}
                            className="hidden h-auto w-[120px] dark:block"
                            alt="Logo"
                            priority
                        />
                    </Link>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]
                        text-lime-700 dark:text-lime-400">
                        Centro de Control
                    </p>

                    <h1 className="text-center text-3xl font-extrabold tracking-tight
                        text-stone-900 dark:text-stone-100 sm:text-4xl">
                        Activaciones guardadas
                    </h1>

                    <p className="mt-2 text-center text-sm text-stone-500 dark:text-stone-400">
                        Consulta el historial y revisa los detalles de cada activación.
                    </p>
                </header>

                {/* History card */}
                <section className="overflow-hidden rounded-2xl border border-stone-200
                    bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">

                    <div className="flex flex-col gap-3 border-b border-stone-200
                        px-5 py-4 dark:border-stone-700 sm:flex-row
                        sm:items-center sm:justify-between sm:px-6">

                        <div>
                            <h2 className="text-base font-bold text-stone-800
                                dark:text-stone-100">
                                Historial de activaciones
                            </h2>
                            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                                Página {props.page}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-full
                            bg-lime-100 px-3 py-1.5 text-xs font-semibold
                            text-lime-800 dark:bg-lime-900/40 dark:text-lime-300">
                            <span className="h-2 w-2 rounded-full bg-lime-600 dark:bg-lime-400" />
                            Centro de Control
                        </div>
                    </div>

                    {props.load_error ? (
                        <div className="px-6 py-16 text-center">
                            <h3 className="text-base font-bold text-stone-800 dark:text-stone-100">
                                No se pudo cargar el historial
                            </h3>
                            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                                Intenta recargar la página en unos momentos.
                            </p>
                        </div>
                    ) : props.logs_page.length === 0 ? (
                        <div className="px-6 py-16 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center
                                justify-center rounded-2xl bg-lime-100 text-lime-800
                                dark:bg-lime-900/40 dark:text-lime-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                                    <path d="M16 3h5v5" />
                                    <path d="m21 3-9 9" />
                                    <path d="M7 16h4" />
                                    <path d="M7 12h2" />
                                </svg>
                            </div>
                            <h3 className="text-base font-bold text-stone-800 dark:text-stone-100">
                                No hay activaciones para mostrar
                            </h3>
                            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                                No se encontraron registros en esta página.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-[760px]">
                                    <thead>
                                        <tr>
                                            <th className="w-24">ID</th>
                                            <th>Fecha y hora</th>
                                            <th>Cliente</th>
                                            <th>Operador</th>
                                            <th className="w-32 text-center">Detalles</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {props.logs_page.map(log => (
                                            <tr key={log.id}>
                                                <td>
                                                    <span className="font-mono text-xs font-semibold
                                                        text-stone-500 dark:text-stone-400">
                                                        #{log.id}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap font-medium
                                                    text-stone-800 dark:text-stone-200">
                                                    {log.datetime}
                                                </td>

                                                <td className="max-w-xs font-medium text-stone-700
                                                    dark:text-stone-200">
                                                    <span className="line-clamp-2">
                                                        {log.client || "—"}
                                                    </span>
                                                </td>

                                                <td className="max-w-xs text-stone-600 dark:text-stone-300">
                                                    <span className="line-clamp-2">
                                                        {log.operator || "—"}
                                                    </span>
                                                </td>

                                                <td className="text-center">
                                                    <Link
                                                        href={`/logs/${log.id}`}
                                                        className="inline-flex items-center justify-center
                                                            gap-2 rounded-lg bg-lime-100 px-3 py-2
                                                            text-xs font-bold text-lime-800 transition
                                                            hover:bg-lime-200 dark:bg-lime-900/40
                                                            dark:text-lime-300 dark:hover:bg-lime-900"
                                                    >
                                                        Ver registro
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M7 17 17 7" />
                                                            <path d="M7 7h10v10" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer and pagination */}
                            <div className="flex flex-col gap-4 border-t border-stone-200
                                px-5 py-4 dark:border-stone-700 sm:flex-row
                                sm:items-center sm:justify-between sm:px-6">

                                <p className="text-sm text-stone-500 dark:text-stone-400">
                                    Página <span className="font-semibold text-stone-800 dark:text-stone-200">
                                        {props.page}
                                    </span>
                                </p>

                                <nav aria-label="Paginación del historial"
                                    className="flex items-center gap-2">
                                    <PaginationButton
                                        href={`/logs?page=${previousPage}`}
                                        disabled={!props.has_previous}
                                        label="Página anterior"
                                    >
                                        <span aria-hidden="true">←</span>
                                        <span className="hidden sm:inline">Anterior</span>
                                    </PaginationButton>

                                    <span className="flex h-10 min-w-10 items-center justify-center
                                        rounded-lg bg-lime-100 px-3 text-sm font-bold
                                        text-lime-800 dark:bg-lime-900/40 dark:text-lime-300">
                                        {props.page}
                                    </span>

                                    <PaginationButton
                                        href={`/logs?page=${nextPage}`}
                                        disabled={!props.has_next}
                                        label="Página siguiente"
                                    >
                                        <span className="hidden sm:inline">Siguiente</span>
                                        <span aria-hidden="true">→</span>
                                    </PaginationButton>
                                </nav>
                            </div>
                        </>
                    )}
                </section>

                <footer className="py-6 text-center text-xs text-stone-400">
                    Historial de activaciones · NEOS
                </footer>
            </div>
        </main>
    );
}
