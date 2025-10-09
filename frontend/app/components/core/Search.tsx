"use client";

import { useState } from "react";
import Form from "../form/Form";
import FormItem from "../form/FormItem";
import Input from "./Input";
import Button from "./Button";
import { Search as SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchProps {
  onSearch?: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    console.log("Search query:", query);
  };

  return (
    <Form
      onSubmit={handleSearch}
      className="flex items-stretch gap-2 w-full max-w-md"
    >
      <FormItem className="flex-1 m-0">
        <Input
          placeholder={t("Search your task here...")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full"
        />
      </FormItem>
      <Button
        type="submit"
        leftIcon={<SearchIcon size={18} />}
        className="h-10 flex-shrink-0"
        children={undefined}
      />
    </Form>
  );
}
