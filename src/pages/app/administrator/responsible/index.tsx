import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Table } from "./table";
import { Pagination } from "./pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import React from "react";

export function Responsible(): React.ReactElement {
  const location = useLocation()
  const [params, setParams] = useSearchParams(
		new URLSearchParams(location.search),
	);

  const SearchInputRef = React.useRef<HTMLInputElement>(null);

  const meta = {
    total: 3,             
    perPage: 1,            
    currentPage: 1,      
    lastPage: 3, 
    firstPage: 1,
    firstPageUrl: "/page/1",
    lastPageUrl: "/page/3",
    nextPageUrl: "/page/2",
    previousPageUrl: null
};

  return (
    <main className="container space-y-5">
      <h2 className="text-2xl font-semibold">Responsáveis</h2>

      <section className="inline-flex items-center space-x-10 w-full">
        <div className="flex-1 inline-flex space-x-2 w-full">
        <Input 
            placeholder="Pesquisar"
            onChange={(event) => {
              if (!event.currentTarget.value) {
                setParams((state) => {
                  state.delete('search');
                  return state;
                })
                return;
              }
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                if (!SearchInputRef.current?.value) return;
                const search = SearchInputRef.current?.value;
                setParams((state) => {
                  state.set('page', '1');
                  state.set('search', search);
                  return state;
                })
              }
            }}
            ref={SearchInputRef}
          />
          <Button 
            className="p-2"
            onClick={() => {
              if (!SearchInputRef.current?.value) return;
              const search = SearchInputRef.current?.value;
              setParams((state) => {
                state.set('page', '1');
                state.set('search', search);
                return state;
              })
            }}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="inline-flex items-center space-x-4">
          <span className="font-medium">Itens por página </span>
          <Select 
            defaultValue={
              params.get('per_page') || '10'
            }
            onValueChange={(value) => {
              setParams((state) => {
                state.set('per_page', value);
                return state;
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>


      <div className="flex flex-col gap-4">
        <Table
          data={[
            {
              id: 1,
              date: "09/10/2024",
              status: "Paga",
              course: "Curso Informática Básica",
            },
            {
              id: 2,
              date: "09/11/2024",
              status: "Pendente",
              course: "Curso Informática Básica",
            },
            {
              id: 3,
              date: "09/12/2024",
              status: "Pendente",
              course: "Curso Informática Básica",
            },
          ]}
          labels={["Referência", "Vencimento", "Valor", "Situação"]}
        />
        <Pagination meta={meta} />
      </div>
    </main>
  );
}