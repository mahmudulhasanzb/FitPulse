import React from 'react';
import Link from 'next/link';
import { 
  Pencil, 
  CheckCircle2, 
  AlertCircle, 
  Plus 
} from 'lucide-react';
import { getClassByEmail } from '@/lib/api/classes/data';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import DeleteModal from '@/components/DeleteClassModal';
import EditClassModal from '@/components/EditClassModal';

const MyClasses = async () => {
const session = await auth.api.getSession({
    headers: await headers(),
  });
const classes = await getClassByEmail(session?.user?.email)

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-[#1C210E] pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-mono">
              My Classes
            </h1>
            <p className="text-xs text-[#A4A896]/60 font-semibold mt-1">
              Manage your upcoming training sessions and student rosters.
            </p>
          </div>

          <Link
            href="/dashboard/trainer/classes/add-class"
            className="inline-flex items-center justify-center gap-1.5 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-xs uppercase px-6 py-3 rounded-lg shadow-lg shadow-[#D4FF00]/10 transition-all duration-200 select-none cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Class</span>
          </Link>
        </div>

        {/* Classes Table Container */}
        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60 text-left">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest">
                    Class Name
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest">
                    Students
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1C210E]/40 font-medium">
                {classes?.map(cls => (
                  <tr
                    key={cls._id}
                    className="hover:bg-[#1C210E]/20 transition-colors duration-150"
                  >
                    {/* Class Name & Schedule */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-extrabold text-white">
                        {cls.className}
                      </div>
                      <div className="text-[11px] text-[#A4A896]/50 mt-1">
                        {cls?.schedule.map((schedule, index) => (
                          <span key={index} className='text-xs text-[#A4A896]/50 mt-1'> {schedule +" " + '-'} </span>
                        ))}
                      </div>
                    </td>

                    {/* Category Tag */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`inline-block text-[9px] font-black tracking-widest border rounded px-2.5 py-1 $
                      `}
                      >
                        {/* {cls.categoryStyle} inside className = `` */}
                        {cls.category}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest border rounded px-3 py-1 $`}
                      >
                        {/* {cls.statusStyle} inside the className = `` */}
                        {cls.status === 'Approved' ? (
                          <CheckCircle2 className="h-3 w-3 text-[#D4FF00]" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-yellow-400" />
                        )}
                        <span>{cls.status}</span>
                      </div>
                    </td>

                    {/* Students count ratio */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-black text-white font-mono">
                        {cls.totalEnrollment}
                        <span className="text-[#A4A896]/35 font-normal">
                          {' '}
                          / 20
                          {/* {cls.capacity} */}
                        </span>
                      </div>
                    </td>

                    {/* Action Items */}
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-4">
                        {/* Edit Action Button */}
                        <EditClassModal classData={cls} />

                        {/* Delete Action Button */}
                        <DeleteModal id={cls._id} />
                        <span className="w-px h-4 bg-[#1C210E]" />

                        {/* Roster Link */}
                        <Link
                          href={`/classes/${cls._id}`}
                          className="text-[11px] font-black tracking-wider text-[#A4A896]/60 hover:text-white underline uppercase transition-colors"
                        >
                          View Students
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
