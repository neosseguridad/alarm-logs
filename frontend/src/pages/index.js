
import Link from "next/link";
import Image from "next/image";

const actions = [
    {
        href: "/new",
        number: "01",
        title: "Registrar activación",
        description:
            "Registra una nueva activación de alarma y documenta la atención realizada.",
        action: "Nueva activación",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden="true"
            >
                <path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.8 7.5 9.5 4.3-1.7 7.5-4.9 7.5-9.5V6L12 3Z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
            </svg>
        ),
    },
    {
        href: "/logs",
        number: "02",
        title: "Consultar historial",
        description:
            "Consulta las activaciones guardadas y revisa los detalles de cada registro.",
        action: "Ver activaciones",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden="true"
            >
                <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                <path d="M16 3h5v5" />
                <path d="m21 3-9 9" />
                <path d="M7 16h4" />
                <path d="M7 12h2" />
            </svg>
        ),
    },
];

export default function Home() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden
            bg-stone-50 px-5 py-10 dark:bg-stone-950 sm:px-8 sm:py-14">

            {/* Subtle background decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32
                    h-96 w-96 rounded-full bg-lime-200/40 blur-3xl
                    dark:bg-lime-900/15"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -left-32
                    h-96 w-96 rounded-full bg-lime-100/60 blur-3xl
                    dark:bg-lime-800/10"
            />

            <div className="relative mx-auto flex w-full max-w-5xl flex-1
                flex-col justify-center">

                {/* Branding */}
                <header className="mb-12 flex flex-col items-center text-center">
                    <div className="mb-8 rounded-2xl border border-stone-200/80
                        bg-white p-3 shadow-sm dark:border-stone-700
                        dark:bg-stone-900">
                        <Image
                            src="/logo.png"
                            alt="NEOS"
                            width={150}
                            height={75}
                            priority
                            className="block h-auto w-[140px] dark:hidden"
                        />
                        <Image
                            src="/logo-dark.png"
                            alt="NEOS"
                            width={150}
                            height={75}
                            priority
                            className="hidden h-auto w-[140px] dark:block"
                        />
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase
                        tracking-[0.22em] text-lime-700 dark:text-lime-400">
                        Centro de Control
                    </p>

                    <h1 className="max-w-2xl text-3xl font-extrabold
                        leading-tight tracking-tight text-stone-900
                        dark:text-stone-100 sm:text-5xl">
                        Bitácora de{" "}
                        <span className="text-lime-700 dark:text-lime-400">
                            activaciones
                        </span>{" "}
                        de alarma
                    </h1>

                    <p className="mt-5 max-w-xl text-sm leading-7
                        text-stone-600 dark:text-stone-400 sm:text-base">
                        Gestiona los registros de atención de alarmas desde
                        un solo lugar. Registra nuevas activaciones o consulta
                        el historial cuando lo necesites.
                    </p>
                </header>

                {/* Main actions */}
                <section aria-label="Acciones principales"
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">

                    {actions.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative flex min-h-64 flex-col
                                overflow-hidden rounded-2xl border border-stone-200
                                bg-white p-6 shadow-sm transition-all duration-200
                                hover:-translate-y-1 hover:border-lime-400
                                hover:shadow-lg hover:shadow-lime-900/5
                                focus-visible:outline-2 focus-visible:outline-offset-4
                                focus-visible:outline-lime-600
                                dark:border-stone-700 dark:bg-stone-900
                                dark:hover:border-lime-700 sm:p-8"
                        >
                            {/* Large decorative number */}
                            <span aria-hidden="true"
                                className="pointer-events-none absolute -right-2
                                    -top-8 select-none text-8xl font-black
                                    tracking-tighter text-stone-100 transition-colors
                                    group-hover:text-lime-50 dark:text-stone-800/60
                                    dark:group-hover:text-lime-950/40">
                                {item.number}
                            </span>

                            <div className="relative mb-7 flex items-center
                                justify-between">
                                <div className="flex h-14 w-14 items-center
                                    justify-center rounded-xl bg-lime-100
                                    text-lime-800 transition-colors
                                    group-hover:bg-lime-200
                                    dark:bg-lime-900/40 dark:text-lime-300
                                    dark:group-hover:bg-lime-900/70">
                                    {item.icon}
                                </div>

                                <span className="flex h-10 w-10 items-center
                                    justify-center rounded-full border
                                    border-stone-200 text-stone-400 transition-all
                                    group-hover:border-lime-500 group-hover:bg-lime-600
                                    group-hover:text-white dark:border-stone-700
                                    dark:group-hover:border-lime-600">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5 transition-transform
                                            group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </div>

                            <h2 className="relative text-xl font-bold
                                tracking-tight text-stone-900 dark:text-stone-100
                                sm:text-2xl">
                                {item.title}
                            </h2>

                            <p className="relative mt-3 flex-1 text-sm
                                leading-6 text-stone-600 dark:text-stone-400">
                                {item.description}
                            </p>

                            <div className="relative mt-7 flex items-center gap-2
                                text-sm font-bold text-lime-800
                                dark:text-lime-400">
                                {item.action}
                                <span aria-hidden="true">→</span>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Footer */}
                <footer className="mt-12 text-center">
                    <div className="mx-auto mb-4 h-px max-w-xs
                        bg-gradient-to-r from-transparent via-stone-300
                        to-transparent dark:via-stone-700" />
                    <p className="text-xs font-medium tracking-wide
                        text-stone-400 dark:text-stone-500">
                        NEOS · Bitácora de activaciones
                    </p>
                </footer>
            </div>
        </main>
    );
}
