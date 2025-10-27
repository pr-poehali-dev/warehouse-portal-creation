import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type UserRole = 'admin' | 'manager' | 'warehouse';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  reserved: number;
  price: number;
  status: 'in-stock' | 'low' | 'out';
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  total: number;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'warehouse' | 'clients' | 'settings' | 'orders'>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [searchTerm, setSearchTerm] = useState('');

  const products: Product[] = [
    { id: 1, name: 'Ноутбук Dell XPS 15', category: 'Электроника', quantity: 45, reserved: 5, price: 125000, status: 'in-stock' },
    { id: 2, name: 'Офисное кресло ErgoChair', category: 'Мебель', quantity: 12, reserved: 2, price: 15000, status: 'low' },
    { id: 3, name: 'Принтер HP LaserJet', category: 'Электроника', quantity: 8, reserved: 1, price: 22000, status: 'low' },
    { id: 4, name: 'Бумага A4 500 листов', category: 'Расходники', quantity: 0, reserved: 0, price: 350, status: 'out' },
    { id: 5, name: 'Монитор Samsung 27"', category: 'Электроника', quantity: 28, reserved: 3, price: 35000, status: 'in-stock' },
  ];

  const clients: Client[] = [
    { id: 1, name: 'ООО "ТехноПлюс"', email: 'info@technoplus.ru', phone: '+7 (495) 123-45-67', orders: 24, total: 1250000 },
    { id: 2, name: 'ИП Иванов А.С.', email: 'ivanov@mail.ru', phone: '+7 (495) 234-56-78', orders: 15, total: 450000 },
    { id: 3, name: 'ООО "БизнесКом"', email: 'order@bizkom.ru', phone: '+7 (495) 345-67-89', orders: 31, total: 2100000 },
    { id: 4, name: 'ООО "Офис Стайл"', email: 'sale@officestyle.ru', phone: '+7 (495) 456-78-90', orders: 8, total: 320000 },
  ];

  const stats = [
    { title: 'Всего товаров', value: '93', change: '+12%', icon: 'Package', color: 'text-primary' },
    { title: 'Активные заказы', value: '28', change: '+5%', icon: 'ShoppingCart', color: 'text-secondary' },
    { title: 'Клиенты', value: '156', change: '+8%', icon: 'Users', color: 'text-accent' },
    { title: 'Выручка', value: '₽4.2M', change: '+15%', icon: 'TrendingUp', color: 'text-green-500' },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="hover-scale transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon name={stat.icon as any} className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 mt-1">{stat.change} за месяц</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" className="h-5 w-5 text-destructive" />
              Требуется внимание
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.filter(p => p.status !== 'in-stock').map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Остаток: {product.quantity} шт</p>
                  </div>
                  <Badge variant={product.status === 'out' ? 'destructive' : 'secondary'}>
                    {product.status === 'out' ? 'Нет в наличии' : 'Мало'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" className="h-5 w-5 text-primary" />
              Недавние уведомления
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Новый заказ #1284</p>
                  <p className="text-xs text-muted-foreground">ООО "ТехноПлюс" • 5 минут назад</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Инвентаризация завершена</p>
                  <p className="text-xs text-muted-foreground">Склад А • 1 час назад</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-muted mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Поступление товара</p>
                  <p className="text-xs text-muted-foreground">45 позиций • 3 часа назад</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderWarehouse = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {userRole === 'admin' && (
          <Button className="gap-2">
            <Icon name="Plus" size={16} />
            Добавить товар
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Товар</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="text-right">Остаток</TableHead>
                <TableHead className="text-right">Резерв</TableHead>
                <TableHead className="text-right">Цена</TableHead>
                <TableHead className="text-center">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right">{product.reserved}</TableCell>
                  <TableCell className="text-right">₽{product.price.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      product.status === 'in-stock' ? 'default' : 
                      product.status === 'low' ? 'secondary' : 'destructive'
                    }>
                      {product.status === 'in-stock' ? 'В наличии' : 
                       product.status === 'low' ? 'Мало' : 'Нет'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="relative max-w-md">
        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск клиентов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover-scale transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {client.name.split(' ')[0][0]}{client.name.split(' ')[1]?.[0] || ''}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Icon name="Mail" size={14} />
                      {client.email}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Icon name="Phone" size={14} />
                      {client.phone}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Заказов</p>
                  <p className="text-2xl font-bold">{client.orders}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Общая сумма</p>
                  <p className="text-2xl font-bold">₽{(client.total / 1000).toFixed(1)}K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" className="h-5 w-5 text-primary" />
            Роли и доступ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Текущая роль</label>
            <Select value={userRole} onValueChange={(value) => setUserRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Icon name="Crown" size={16} />
                    Администратор
                  </div>
                </SelectItem>
                <SelectItem value="manager">
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={16} />
                    Менеджер
                  </div>
                </SelectItem>
                <SelectItem value="warehouse">
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size={16} />
                    Кладовщик
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 space-y-3">
            <h4 className="font-medium">Права доступа:</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Управление товарами</span>
                <Badge variant={userRole === 'admin' ? 'default' : 'secondary'}>
                  {userRole === 'admin' ? 'Полный доступ' : 'Только чтение'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Управление клиентами</span>
                <Badge variant={userRole !== 'warehouse' ? 'default' : 'secondary'}>
                  {userRole !== 'warehouse' ? 'Доступно' : 'Ограничено'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Инвентаризация</span>
                <Badge variant="default">Доступно</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bell" className="h-5 w-5 text-primary" />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Email уведомления</span>
            <Button variant="outline" size="sm">Включены</Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Push уведомления</span>
            <Button variant="outline" size="sm">Включены</Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Уведомления о низком остатке</span>
            <Button variant="outline" size="sm">Включены</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" className="h-5 w-5 text-primary" />
            Активные заказы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 1284, client: 'ООО "ТехноПлюс"', items: 12, total: 245000, status: 'new' },
              { id: 1283, client: 'ИП Иванов А.С.', items: 5, total: 89000, status: 'processing' },
              { id: 1282, client: 'ООО "БизнесКом"', items: 8, total: 156000, status: 'ready' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Заказ #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{order.items} товаров</p>
                  <p className="font-bold">₽{order.total.toLocaleString()}</p>
                </div>
                <Badge variant={
                  order.status === 'new' ? 'default' :
                  order.status === 'processing' ? 'secondary' : 'outline'
                }>
                  {order.status === 'new' ? 'Новый' :
                   order.status === 'processing' ? 'В работе' : 'Готов'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Главная', icon: 'Home' },
    { id: 'warehouse', label: 'Склад', icon: 'Package' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingCart' },
    { id: 'clients', label: 'Клиенты', icon: 'Users' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Warehouse" className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">WareFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Складской портал</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as any);
                  setSearchTerm('');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">АП</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Админ Портала</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {userRole === 'admin' ? 'Администратор' : userRole === 'manager' ? 'Менеджер' : 'Кладовщик'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground">
            {currentPage === 'dashboard' && 'Дашборд'}
            {currentPage === 'warehouse' && 'Управление складом'}
            {currentPage === 'clients' && 'База клиентов'}
            {currentPage === 'settings' && 'Настройки'}
            {currentPage === 'orders' && 'Заказы'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {currentPage === 'dashboard' && 'Обзор основных показателей системы'}
            {currentPage === 'warehouse' && 'Инвентаризация и учет товаров'}
            {currentPage === 'clients' && 'Управление клиентской базой'}
            {currentPage === 'settings' && 'Конфигурация системы и прав доступа'}
            {currentPage === 'orders' && 'Обработка и управление заказами'}
          </p>
        </div>

        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'warehouse' && renderWarehouse()}
        {currentPage === 'clients' && renderClients()}
        {currentPage === 'settings' && renderSettings()}
        {currentPage === 'orders' && renderOrders()}
      </main>
    </div>
  );
};

export default Index;
