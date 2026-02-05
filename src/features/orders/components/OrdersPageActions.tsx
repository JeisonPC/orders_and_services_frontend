"use client";

import { useState } from "react";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import { Button } from "@/ui/atoms/Button/Button";
import { Label } from "@/ui/atoms/Label";
import { Field } from "@/ui/molecules/Field";
import { Modal } from "@/ui/organisms/Modal";

export function OrdersPageActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createOrder = useCreateOrder();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createOrder.mutate({
      customer_id: Number(formData.get('customer_id')),
      product_name: formData.get('product_name') as string,
      quantity: Number(formData.get('quantity')),
      price: Number(formData.get('price')),
      status: formData.get('status') as string,
    }, {
      onSuccess: () => {
        console.log('Pedido creado exitosamente');
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error('Error al crear pedido:', error);
      }
    });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Crear pedido
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear nuevo pedido"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Field
              label="ID Cliente"
              type="number"
              name="customer_id"
              defaultValue={1}
              required
            />

            <Field
              label="Nombre del producto"
              type="text"
              name="product_name"
              required
            />

            <Field
              label="Cantidad"
              type="number"
              name="quantity"
              defaultValue={1}
              min={1}
              required
            />

            <Field
              label="Precio"
              type="number"
              name="price"
              defaultValue={0}
              min={0}
              step="0.01"
              required
            />

            <div>
              <Label htmlFor="status" required>
                Estado
              </Label>
              <select
                id="status"
                name="status"
                defaultValue="pending"
                required
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
              >
                <option value="pending">Pendiente</option>
                <option value="processing">En proceso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={createOrder.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={createOrder.isPending}
              >
                Crear pedido
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
