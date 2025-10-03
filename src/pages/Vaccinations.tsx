import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import GlassNavbar from '@/components/GlassNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddVaccineDialog } from '@/components/vaccination/AddVaccineDialog';
import { VaccineCard } from '@/components/vaccination/VaccineCard';

interface VaccinationRecord {
  id: string;
  vaccine_name: string;
  dose_number: number;
  total_doses: number;
  date_taken: string | null;
  next_due_date: string | null;
  status: 'completed' | 'upcoming' | 'overdue';
  notes: string | null;
}

export default function Vaccinations() {
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to view your vaccinations.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('vaccination_records')
        .select('*')
        .eq('user_id', user.id)
        .order('next_due_date', { ascending: true, nullsFirst: false });

      if (error) throw error;
      setVaccinations(data || []);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      toast({
        title: "Error",
        description: "Failed to load vaccination records.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const upcomingVaccinations = vaccinations.filter(v => v.status === 'upcoming' || v.status === 'overdue');
  const completedVaccinations = vaccinations.filter(v => v.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <GlassNavbar />
      
      <main className="pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Vaccination Schedule
              </h1>
              <p className="text-slate-300">
                Track and manage your vaccination records
              </p>
            </div>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Vaccine Record
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  {upcomingVaccinations.filter(v => v.status === 'upcoming').length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Overdue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400">
                  {upcomingVaccinations.filter(v => v.status === 'overdue').length}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {completedVaccinations.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {loading ? (
            <div className="text-center text-slate-300 py-12">
              Loading vaccinations...
            </div>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Vaccinations */}
              {upcomingVaccinations.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-green-400" />
                    Upcoming Vaccinations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingVaccinations.map((vaccine) => (
                      <VaccineCard
                        key={vaccine.id}
                        vaccine={vaccine}
                        onUpdate={fetchVaccinations}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Completed Vaccinations */}
              {completedVaccinations.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-slate-400" />
                    Completed Vaccinations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedVaccinations.map((vaccine) => (
                      <VaccineCard
                        key={vaccine.id}
                        vaccine={vaccine}
                        onUpdate={fetchVaccinations}
                      />
                    ))}
                  </div>
                </section>
              )}

              {vaccinations.length === 0 && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No vaccination records yet
                    </h3>
                    <p className="text-slate-300 mb-4">
                      Start tracking your vaccinations by adding your first record.
                    </p>
                    <Button onClick={() => setShowAddDialog(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Vaccine
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <AddVaccineDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={fetchVaccinations}
      />
    </div>
  );
}