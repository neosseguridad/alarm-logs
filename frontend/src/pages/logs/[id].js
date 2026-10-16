
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.backend}/log/${params.id}`);

    if (!res.ok) {
        return { notFound: true };
    }

    const data = await res.json();

    return {
        props: data,
    };
}

function Status({ value, yesText = "Sí", noText = "No" }) {
    const positive = value === true;

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1
                text-xs font-semibold ${
                    positive
                        ? "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300"
                        : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    positive ? "bg-lime-600" : "bg-stone-400"
                }`}
            />
            {positive ? yesText : noText}
        </span>
    );
}

function DetailSection({ title, children }) {
    return (
        <section className="border-b border-stone-200 py-5 last:border-b-0
            dark:border-stone-700">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider
                text-lime-800 dark:text-lime-400">
                {title}
            </h2>
            <div className="space-y-2 text-sm leading-6 text-stone-700
                dark:text-stone-300">
                {children}
            </div>
        </section>
    );
}

function DetailValue({ children }) {
    return (
        <p className="whitespace-pre-wrap break-words">
            {children}
        </p>
    );
}

export default function Log(props) {
    const router = useRouter();
    const id = router.query.id;

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto w-full max-w-5xl">

                {/* Header */}
                <header className="mb-8 flex flex-col items-center">
                    <Link
                        href="/"
                        aria-label="Volver al inicio"
                        className="mb-5 rounded-xl p-2 transition hover:bg-lime-100
                            dark:hover:bg-lime-900/30"
                    >
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={140}
                            height={70}
                            className="block h-auto w-[120px] dark:hidden"
                            priority
                        />
                        <Image
                            src="/logo-dark.png"
                            alt="Logo"
                            width={140}
                            height={70}
                            className="hidden h-auto w-[120px] dark:block"
                            priority
                        />
                    </Link>

                    <div className="text-center">
                        <p className="mb-2 text-xs font-bold uppercase
                            tracking-[0.2em] text-lime-700 dark:text-lime-400">
                            Centro de Control
                        </p>

                        <h1 className="text-3xl font-extrabold tracking-tight
                            text-stone-900 dark:text-stone-100 sm:text-4xl">
                            Activación <span className="text-lime-700 dark:text-lime-400">
                                {id}
                            </span>
                        </h1>

                        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                            Detalle de la atención y evaluación de la alarma
                        </p>
                    </div>
                </header>

                {/* Metadata */}
                <section className="mb-6 overflow-hidden rounded-2xl border
                    border-stone-200 bg-white shadow-sm dark:border-stone-700
                    dark:bg-stone-900">

                    <div className="border-b border-stone-200 px-5 py-4
                        dark:border-stone-700">
                        <h2 className="text-sm font-bold text-stone-800
                            dark:text-stone-100">
                            Información general
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase
                                tracking-wide text-stone-500 dark:text-stone-400">
                                Fecha y hora
                            </p>
                            <p className="break-words text-sm font-semibold
                                text-stone-800 dark:text-stone-100">
                                {props.datetime || "No disponible"}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase
                                tracking-wide text-stone-500 dark:text-stone-400">
                                Cliente
                            </p>
                            <p className="break-words text-sm font-semibold
                                text-stone-800 dark:text-stone-100">
                                {props.client || "No disponible"}
                            </p>
                        </div>

                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase
                                tracking-wide text-stone-500 dark:text-stone-400">
                                Operador
                            </p>
                            <p className="break-words text-sm font-semibold
                                text-stone-800 dark:text-stone-100">
                                {props.operator || "No disponible"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Details */}
                <section className="rounded-2xl border border-stone-200
                    bg-white px-5 shadow-sm dark:border-stone-700
                    dark:bg-stone-900 sm:px-7">

                    <DetailSection title="Tipo de alarma">
                        <DetailValue>{props.alarm_type || "No especificado"}</DetailValue>

                        {props.alarm_type_desc != null && (
                            <DetailValue>{props.alarm_type_desc}</DetailValue>
                        )}
                    </DetailSection>

                    <DetailSection title="Contacto con el usuario">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span>¿El usuario contestó la llamada?</span>
                            <Status value={props.user_answered} />

                            
                        </div>
                        {props.user_name != null && (
                            <DetailValue>Contestó {props.user_name}</DetailValue>
                        )}
                    </DetailSection>

                    {props.real_emergency != null && (
                        <DetailSection title="Estado de emergencia">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span>Resultado de la evaluación</span>
                                <Status
                                    value={props.real_emergency}
                                    yesText="Emergencia real"
                                    noText="Falsa alarma"
                                />
                            </div>
                        </DetailSection>
                    )}

                    {props.false_alarm_type != null && (
                        <DetailSection title="Razón de falsa alarma">
                            <DetailValue>{props.false_alarm_type}</DetailValue>

                            {props.false_alarm_type_desc != null && (
                                <DetailValue>{props.false_alarm_type_desc}</DetailValue>
                            )}
                        </DetailSection>
                    )}

                    {props.correct_password != null && (
                        <DetailSection title="Consigna del usuario">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span>
                                    ¿Brindó la consigna correcta inicialmente?
                                </span>
                                <Status value={props.correct_password} />
                            </div>
                        </DetailSection>
                    )}

                    {props.correct_password_later != null && (
                        <DetailSection title="Verificación posterior">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span>
                                    ¿Brindó la consigna correcta posteriormente?
                                </span>
                                <Status value={props.correct_password_later} />
                            </div>
                        </DetailSection>
                    )}
                </section>

                <footer className="py-6 text-center text-xs text-stone-400">
                    Registro de activación · {id}
                </footer>
            </div>
        </main>
    );
}
