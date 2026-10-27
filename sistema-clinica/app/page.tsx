
"use client";

import { useState } from "react";

type Appointment = {
  id: number;
  patient: string;
  professional: string;
  service: string;
  time: string;
  status: string;
};

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Maria Oliveira",
    professional: "Dra. Ana",
    service: "Avaliação estética",
    time: "09:00",
    status: "Confirmado",
  },
  {
    id: 2,
    patient: "João Santos",
    professional: "Dr. Pedro",
    service: "Consulta odontológica",
    time: "10:30",
    status: "Aguardando",
  },
  {
    id: 3,
    patient: "Carla Souza",
    professional: "Dra. Ana",
    service: "Procedimento estético",
    time: "14:00",
    status: "Confirmado",
  },
];

const menu = [
  { label: "Visão geral", icon: "▦" },
  { label: "Agenda", icon: "▣" },
  { label: "Pacientes", icon: "♙" },
  { label: "Prontuários", icon: "▤" },
  { label: "Tratamentos", icon: "♡" },
];

export default function Home() {
  const [active, setActive] = useState("Visão geral");
  const [appointments, setAppointments] =
    useState(initialAppointments);
  const [showForm, setShowForm] = useState(false);
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("15:00");
  const [service, setService] = useState("Consulta odontológica");
  const [notice, setNotice] = useState("");

  function addAppointment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!patient.trim()) return;

    setAppointments((current) =>
      [...current, {
        id: Date.now(),
        patient: patient.trim(),
        professional: "A definir",
        service,
        time,
        status: "Aguardando",
      }].sort((a, b) => a.time.localeCompare(b.time))
    );

    setPatient("");
    setShowForm(false);
    setActive("Agenda");
    setNotice("Atendimento adicionado à demonstração.");
  }

  const patients = Array.from(
    new Set(appointments.map((item) => item.patient))
  );

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-800 md:flex">
      <aside className="w-full shrink-0 bg-[#172d4d] p-5 text-white md:min-h-screen md:w-64">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400 text-xl font-bold text-[#172d4d]">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold">Clínica</h1>
            <p className="text-xs text-slate-300">Gestão integrada</p>
          </div>
        </div>

        <p className="mb-3 text-xs uppercase tracking-widest text-slate-400">
          Menu principal
        </p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {menu.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActive(item.label);
                setNotice("");
              }}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                active === item.label
                  ? "bg-teal-400 font-semibold text-[#172d4d]"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">Sistema em construção</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            Esta é a primeira versão visual. Os dados ainda são de demonstração.
          </p>
        </div>
      </aside>

      <section className="min-w-0 flex-1 p-5 md:p-9">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Gestão da clínica / {active}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              {active}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Acompanhe os atendimentos e a rotina da clínica.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setNotice("");
            }}
            className="rounded-xl bg-[#172d4d] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#24466f]"
          >
            + Novo atendimento
          </button>
        </header>

        {notice && (
          <div className="mb-5 rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm text-teal-800">
            {notice}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={addAppointment}
            className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2"
          >
            <h3 className="font-semibold md:col-span-2">
              Adicionar atendimento de demonstração
            </h3>

            <label className="text-sm">
              Nome do paciente
              <input
                required
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Digite o nome"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-teal-500"
              />
            </label>

            <label className="text-sm">
              Horário
              <input
                required
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5"
              />
            </label>

            <label className="text-sm md:col-span-2">
              Serviço
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
              >
                <option>Consulta odontológica</option>
                <option>Avaliação estética</option>
                <option>Procedimento estético</option>
                <option>Retorno</option>
              </select>
            </label>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {active === "Visão geral" && (
          <>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Atendimentos",
                  value: String(appointments.length),
                  detail: "Na lista de demonstração",
                },
                {
                  label: "Confirmados",
                  value: String(
                    appointments.filter(
                      (a) => a.status === "Confirmado"
                    ).length
                  ),
                  detail: "Status atual",
                },
                {
                  label: "A confirmar",
                  value: String(
                    appointments.filter(
                      (a) => a.status === "Aguardando"
                    ).length
                  ),
                  detail: "Precisam de confirmação",
                },
                {
                  label: "Pacientes",
                  value: String(patients.length),
                  detail: "Nomes na demonstração",
                },
              ].map((card) => (
                <article
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="my-3 text-3xl font-bold">{card.value}</p>
                  <p className="text-xs text-slate-400">{card.detail}</p>
                </article>
              ))}
            </div>

            <AppointmentTable appointments={appointments} />
          </>
        )}

        {active === "Agenda" && (
          <AppointmentTable appointments={appointments} />
        )}

        {active === "Pacientes" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Pacientes da demonstração</h3>
            <p className="mb-5 mt-1 text-sm text-slate-500">
              A lista definitiva será ligada ao banco de dados.
            </p>
            {patients.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum paciente cadastrado.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {patients.map((name) => (
                  <li key={name} className="py-4 text-sm font-medium">
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {active === "Prontuários" && (
          <Placeholder
            title="Prontuários clínicos"
            description="Vamos desenvolver prontuários separados para odontologia e estética, com controle de acesso e histórico de alterações."
          />
        )}

        {active === "Tratamentos" && (
          <Placeholder
            title="Tratamentos e sessões"
            description="Aqui ficará o plano de tratamento, as etapas e o saldo de sessões, com baixa somente após a conclusão do procedimento."
          />
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          Protótipo de desenvolvimento • Não utilizar dados reais de pacientes
        </p>
      </section>
    </main>
  );
}

function AppointmentTable({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <h3 className="font-bold">Agenda de atendimentos</h3>
          <p className="mt-1 text-sm text-slate-500">
            Horários e situação dos atendimentos
          </p>
        </div>
        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
          Dados fictícios
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Horário</th>
              <th className="px-5 py-4">Paciente</th>
              <th className="px-5 py-4">Serviço</th>
              <th className="px-5 py-4">Profissional</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4 font-semibold">
                  {appointment.time}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  {appointment.patient}
                </td>
                <td className="px-5 py-4">{appointment.service}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  {appointment.professional}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                      appointment.status === "Confirmado"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointments.length === 0 && (
        <p className="p-6 text-sm text-slate-500">
          Nenhum atendimento na lista.
        </p>
      )}
    </section>
  );
}

function Placeholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl text-teal-700">
        +
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {description}
      </p>
      <span className="mt-5 inline-block rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
        Próxima etapa do desenvolvimento
      </span>
    </section>
  );
}
