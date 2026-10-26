"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Save } from "lucide-react";
import { FormEvent, useState } from "react";

interface IDataType {
  _id?: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const EditDestinationDialog = ({ destination }: { destination: IDataType }) => {
  // console.log(destination, "this is passed by props");

  const [formData, setFormData] = useState(destination);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string | null) => {
    setFormData((prev) => ({ ...prev, category: value ?? "" }));
  };

  const handleReset = () => {
    setFormData({
      destinationName: "",
      country: "",
      category: "",
      price: "",
      duration: "",
      departureDate: "",
      imageUrl: "",
      description: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { _id, ...updatedData } = formData;
    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      },
    );
    const data = await res.json();
    console.log("working data", data);

    // console.log("Travel Package Data:", formData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium border border-slate-300 rounded text-slate-700 hover:bg-slate-50 transition-colors">
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
      </DialogTrigger>
      <DialogContent className={"min-w-3xl"}>
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="destinationName"
                  className="text-sm font-semibold text-neutral-800"
                >
                  Destination Name
                </Label>
                <Input
                  id="destinationName"
                  name="destinationName"
                  placeholder="Bali Paradise"
                  value={formData.destinationName}
                  onChange={handleChange}
                  className="bg-[#f8f9fa] border-none text-neutral-700 placeholder:text-neutral-400 h-11 focus-visible:ring-1 focus-visible:ring-neutral-300"
                />
              </div>

              {/* Country & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="text-sm font-semibold text-neutral-800"
                  >
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Bangladesh"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-[#f8f9fa] border-none text-neutral-700 placeholder:text-neutral-400 h-11 focus-visible:ring-1 focus-visible:ring-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-semibold text-neutral-800"
                  >
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="bg-[#f8f9fa] border-none text-neutral-600 h-11 focus:ring-1 focus:ring-neutral-300">
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beach">Beach</SelectItem>
                      <SelectItem value="mountain">Mountain</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="city">City Tour</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-sm font-semibold text-neutral-800"
                  >
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="e.g., 1299"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-[#f8f9fa] border-none text-neutral-700 placeholder:text-neutral-400 h-11 focus-visible:ring-1 focus-visible:ring-neutral-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="duration"
                    className="text-sm font-semibold text-neutral-800"
                  >
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    value={formData.duration}
                    onChange={handleChange}
                    className="bg-[#f8f9fa] border-none text-neutral-700 placeholder:text-neutral-400 h-11 focus-visible:ring-1 focus-visible:ring-neutral-300"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <Label
                  htmlFor="departureDate"
                  className="text-sm font-semibold text-neutral-800"
                >
                  Departure Date
                </Label>
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="bg-[#f8f9fa] border-none text-neutral-700 placeholder:text-neutral-400 h-11 focus-visible:ring-1 focus-visible:ring-neutral-300"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label
                  htmlFor="imageUrl"
                  className="text-sm font-semibold text-neutral-800"
                >
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="bg-[#f8f9fa] border-none text-neutral-700 placeholder:text-neutral-400 h-11 focus-visible:ring-1 focus-visible:ring-neutral-300"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-semibold text-neutral-800"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the travel experience..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-[#f8f9fa] border-none resize-none text-neutral-700 placeholder:text-neutral-400 p-4 focus-visible:ring-1 focus-visible:ring-neutral-300"
                />
              </div>

              {/* বাটনসমূহ */}
              <div className="flex items-center justify-end gap-3 pt-3">
                {/* Cancel Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 px-5 h-10 rounded-sm font-normal flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Cancel
                </Button>

                {/* Add Travel Package Button */}
                <Button
                  type="submit"
                  className="bg-[#0e95b0] hover:bg-[#0c7f96] text-white px-5 h-10 rounded-sm font-normal flex items-center gap-2 shadow-none"
                >
                  <Save className="w-4 h-4" />
                  Edit Travel Package
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
