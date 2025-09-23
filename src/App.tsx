import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, ApiError } from '@/lib/api';
import { formatCurrency, formatDate, getStatusInfo } from '@/lib/utils';
import { Cliente, DashboardStats, CreateClientData } from '@/types';
import { Users, DollarSign, Clock, AlertTriangle, Plus, Search } from 'lucide-react';

function App() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClient, setNewClient] = useState<CreateClientData>({
    name: '',
    contact: '',
    dueDate: '',
    amount: 0,
    email: '',
    address: ''
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [clientsResponse, statsResponse] = await Promise.all([
        api.getClients({ search: searchTerm }),
        api.getDashboardStats()
      ]);
      
      setClients(clientsResponse.clients || []);
      setStats(statsResponse);
    } catch (err) {
      console.error('Error loading data:', err);
      if (err instanceof ApiError) {
        setError(`Erro da API: ${err.message}`);
      } else {
        setError('Erro ao carregar dados. Verifique se o backend está rodando.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createClient(newClient);
      setNewClient({
        name: '',
        contact: '',
        dueDate: '',
        amount: 0,
        email: '',
        address: ''
      });
      setShowAddForm(false);
      loadData();
    } catch (err) {
      console.error('Error creating client:', err);
      alert('Erro ao criar cliente');
    }
  };

  const handleStatusChange = async (id: number, status: 'PENDING' | 'PAID' | 'OVERDUE') => {
    try {
      await api.updateClient(id, { status });
      loadData();
    } catch (err) {
      console.error('Error updating client:', err);
      alert('Erro ao atualizar status');
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.deleteClient(id);
        loadData();
      } catch (err) {
        console.error('Error deleting client:', err);
        alert('Erro ao excluir cliente');
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Erro de Conexão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadData} className="w-full">
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestão de Clientes
          </h1>
          <p className="text-gray-600">
            Sistema integrado com banco de dados na nuvem
          </p>
        </div>

        {/* Dashboard Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.clients.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.amounts.total)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.clients.pending}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(stats.amounts.pending)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.clients.overdue}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(stats.amounts.overdue)}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        {/* Add Client Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Novo Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Contato"
                    value={newClient.contact}
                    onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                    required
                  />
                  <Input
                    type="date"
                    value={newClient.dueDate}
                    onChange={(e) => setNewClient({ ...newClient, dueDate: e.target.value })}
                    required
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Valor"
                    value={newClient.amount || ''}
                    onChange={(e) => setNewClient({ ...newClient, amount: parseFloat(e.target.value) || 0 })}
                    required
                  />
                  <Input
                    placeholder="Email (opcional)"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  />
                  <Input
                    placeholder="Endereço (opcional)"
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    Criar Cliente
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Clients List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            const statusInfo = getStatusInfo(client.status);
            
            return (
              <Card key={client.id} className={`${statusInfo.borderColor} border-l-4`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} ${statusInfo.bgColor}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Contato:</strong> {client.contact}
                    </p>
                    {client.email && (
                      <p className="text-sm text-gray-600">
                        <strong>Email:</strong> {client.email}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      <strong>Vencimento:</strong> {formatDate(client.dueDate)}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(client.amount)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {client.status !== 'PAID' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(client.id, 'PAID')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Marcar como Pago
                      </Button>
                    )}
                    {client.status === 'PAID' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(client.id, 'PENDING')}
                      >
                        Marcar como Pendente
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {clients.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Nenhum cliente encontrado.</p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')} 
                  className="mt-2"
                >
                  Limpar Busca
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;