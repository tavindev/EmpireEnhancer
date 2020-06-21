const F = p => {
  return `<div id="inv_price"
  class="flex relative justify-center items-center w-full"
  style="font-family: american-captain; font-size: 1.38rem; font-weight: 400; color: silver">
    Inventory Price: $${p}
    <span style='color: #10d960; margin-left: .25rem'>
      ($${(p * 1.12).toFixed(2)})
    </span>
</div>`;
};

export default F;
